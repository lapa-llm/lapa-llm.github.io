// Loss-landscape engine: an organic scalar field (hills, local minima, a ravine into a global
// minimum), iso-lines via marching squares, and an SGD-with-momentum walker.
// Shared by the server render (static first frame) and the client (animation).

/** Cursor disturbance: the cursor itself plus a fading wake of recent positions. */
export type Pointer = { x: number; y: number; s: number }[] | null;

type FieldSpec = {
  w: number;
  h: number;
  seed?: number;
  /** global minimum, as fractions of w/h */
  mx?: number;
  my?: number;
  /** visible part of the field [x0, x1, y0, y1]; hills and local minima are placed inside it */
  view?: [number, number, number, number];
  /** experimental: blobs slowly rise, sink, drift and swell like wax in a lava lamp */
  lava?: boolean;
};

export type Field = ((x: number, y: number, t: number, p?: Pointer) => number) & {
  /** terrain without the cursor */
  base: (x: number, y: number, t: number) => number;
  /** cursor (and wake) contribution only */
  cursor: (x: number, y: number, p: Pointer) => number;
  /** reach of one cursor bump, in field units (for cheap local updates) */
  cursorReach: number;
  levels: number[];
  min: { x: number; y: number };
  fmin: number;
  fmax: number;
  /** maps a field value to a displayed "loss" number */
  loss: (v: number) => number;
};

function rng(seed: number) {
  let s = Math.abs(Math.floor(seed * 2654435761)) % 2147483647 || 1;
  return () => (s = (s * 48271) % 2147483647) / 2147483647;
}

/** Rotated anisotropic Gaussian. */
function g(x: number, y: number, cx: number, cy: number, sx: number, sy: number, th: number) {
  const c = Math.cos(th), s = Math.sin(th), dx = x - cx, dy = y - cy;
  const u = (dx * c + dy * s) / sx, v = (-dx * s + dy * c) / sy;
  return Math.exp(-0.5 * (u * u + v * v));
}

export function makeField(spec: FieldSpec): Field {
  const { w, h } = spec;
  const r = rng(spec.seed ?? 7);
  const S = Math.min(w, h * 1.6);
  const mx = (spec.mx ?? 0.62) * w, my = (spec.my ?? 0.55) * h;

  // Ravine: a long narrow valley that runs into the global minimum from one side.
  const ravTh = (r() - 0.5) * 1.2 + (r() < 0.5 ? 0 : Math.PI);
  const ravLen = S * (0.32 + r() * 0.12);
  const rav = { x: mx - Math.cos(ravTh) * ravLen * 0.55, y: my - Math.sin(ravTh) * ravLen * 0.55 };

  // Little valleys (traps), real peaks and broad hills, scattered inside the visible area.
  const kinds = [
    ...Array.from({ length: 6 + Math.floor(r() * 3) }, () => 'dip'),
    ...Array.from({ length: 2 + Math.floor(r() * 2) }, () => 'peak'),
    'hill', 'hill',
  ];
  const bumps = kinds.map((kind) => {
    const [v0, v1, v2, v3] = spec.view ?? [0, 1, 0, 1];
    let x = 0, y = 0;
    for (let k = 0; k < 30; k++) {
      x = (v0 + r() * (v1 - v0)) * w; y = (v2 + r() * (v3 - v2)) * h;
      if (Math.hypot(x - mx, (y - my) * 1.4) > S * (kind === 'dip' ? 0.14 : 0.22)) break;
    }
    const sz = kind === 'dip' ? [0.022, 0.02] : kind === 'peak' ? [0.04, 0.03] : [0.09, 0.06];
    return {
      x, y,
      sx: S * (sz[0] + r() * sz[1]),
      sy: S * (sz[0] * 0.8 + r() * sz[1]),
      th: r() * Math.PI,
      a: kind === 'dip' ? -(0.2 + r() * 0.16) : kind === 'peak' ? 0.75 + r() * 0.45 : 0.22 + r() * 0.25,
      ph: r() * 6.28,
    };
  });

  // Secondary valleys: real competing basins (shallower than the global one) to make it interesting.
  const nBasins = 1 + Math.floor(r() * 2.2); // 1–3
  const basins = Array.from({ length: nBasins }, () => {
    const [v0, v1, v2, v3] = spec.view ?? [0, 1, 0, 1];
    let x = 0, y = 0;
    for (let k = 0; k < 30; k++) {
      x = (v0 + 0.06 + r() * (v1 - v0 - 0.12)) * w; y = (v2 + 0.06 + r() * (v3 - v2 - 0.12)) * h;
      if (Math.hypot(x - mx, (y - my) * 1.3) > S * 0.3) break;
    }
    return { x, y, sx: S * (0.06 + r() * 0.05), sy: S * (0.045 + r() * 0.04), th: r() * Math.PI, a: -(0.75 + r() * 0.3), ph: r() * 6.28 };
  });

  // Lava-lamp motion (optional): each blob gets its own slow orbit and pulse. Separate RNG so the
  // terrain layout for a seed is identical with or without it. The global minimum and ravine stay put.
  const rl = rng((spec.seed ?? 7) + 101);
  const lavaMotion = () => {
    const period = 30 + rl() * 25;                     // seconds per rise-and-sink cycle (calm)
    return {
      sp: (Math.PI * 2) / period,
      ph: rl() * 6.28, ph2: rl() * 6.28,
      ay: h * (0.06 + rl() * 0.06),                    // vertical travel (rise / sink)
      ax: w * (0.015 + rl() * 0.015),                  // gentle sideways drift
      pulse: 0.08 + rl() * 0.06,                       // swell / shrink
    };
  };
  const bumpMotion = bumps.map(lavaMotion), basinMotion = basins.map(lavaMotion);
  const at = (b: { x: number; y: number; sx: number; sy: number }, m: ReturnType<typeof lavaMotion>, t: number) => {
    if (!spec.lava) return b;
    const k = 1 + m.pulse * Math.sin(t * m.sp * 1.6 + m.ph2);
    return {
      x: b.x + Math.sin(t * m.sp * 0.6 + m.ph2) * m.ax,
      y: b.y + Math.sin(t * m.sp + m.ph) * m.ay,
      sx: b.sx * 1.15 * k, sy: b.sy * 1.15 * Math.sqrt(k * (2 - k)),  // slightly rounder; soft squash and stretch
    };
  };

  // Low-frequency undulation (cheap analytic "noise").
  const waves = Array.from({ length: 4 }, (_, k) => {
    const th = r() * Math.PI, f = (2.2 + k * 1.7 + r()) / S;
    return { cx: Math.cos(th) * f, cy: Math.sin(th) * f, a: 0.07 / (k + 1), ph: r() * 6.28, sp: 0.05 + r() * 0.08 };
  });

  // Cursor: a small, soft hill (plus a fading wake of even smaller ones)
  const cs = S * 0.03, ca = 0.55;
  const cursor = (x: number, y: number, p: Pointer) => {
    let v = 0;
    if (p) for (const q of p) if (q.s > 0.002) v += ca * q.s * g(x, y, q.x * w, q.y * h, cs, cs, 0);
    return v;
  };

  const base = (x: number, y: number, t: number) => {
    let v = -1.5 * g(x, y, mx, my, S * 0.11, S * 0.085, ravTh);           // global minimum (bowl)
    v += -0.75 * g(x, y, rav.x, rav.y, ravLen * 0.6, S * 0.028, ravTh);   // ravine leading in
    bumps.forEach((b, i) => {
      const q = at(b, bumpMotion[i], t);
      v += b.a * (1 + 0.08 * Math.sin(t * 0.25 + b.ph)) * g(x, y, q.x, q.y, q.sx, q.sy, b.th);
    });
    basins.forEach((b, i) => {
      const q = at(b, basinMotion[i], t);
      v += b.a * (1 + 0.06 * Math.sin(t * 0.2 + b.ph)) * g(x, y, q.x, q.y, q.sx, q.sy, b.th);
    });
    for (const q of waves) v += q.a * Math.sin(x * q.cx + y * q.cy + q.ph + t * q.sp);
    v += 0.75 * (Math.hypot(x - mx, (y - my) * 1.3) / S) ** 1.15;         // overall bowl: everything slopes toward the minimum
    return v;
  };
  const field = ((x: number, y: number, t: number, p?: Pointer) => base(x, y, t) + (p ? cursor(x, y, p) : 0)) as Field;
  field.base = base;
  field.cursor = cursor;
  field.cursorReach = cs * 3.2;

  // Levels from the field's actual range (sampled once, at t=0).
  let fmin = Infinity, fmax = -Infinity;
  for (let j = 0; j <= 40; j++) for (let i = 0; i <= 64; i++) {
    const v = field((i / 64) * w, (j / 40) * h, 0);
    if (v < fmin) fmin = v;
    if (v > fmax) fmax = v;
  }
  // Levels: denser near the bottom (valleys read clearly) but reaching up to the peaks
  const n = 16, range = (fmax - fmin) * 0.93;
  field.levels = Array.from({ length: n }, (_, i) => fmin + range * (0.025 + 0.975 * ((i + 1) / n) ** 1.35));
  field.min = { x: mx, y: my };
  field.fmin = fmin;
  field.fmax = fmax;
  field.loss = (v) => 0.18 + ((v - fmin) / (fmax - fmin)) * 2.6;
  return field;
}

const r1 = (v: number) => Math.round(v * 10) / 10;

export type Grid = { v: Float32Array; nx: number; ny: number; cell: number };

/** Sample the terrain (without the cursor) on a regular grid. */
export function sampleGrid(f: Field, w: number, h: number, cell: number, t: number, out?: Grid): Grid {
  const nx = Math.ceil(w / cell) + 1, ny = Math.ceil(h / cell) + 1;
  const g = out && out.nx === nx && out.ny === ny ? out : { v: new Float32Array(nx * ny), nx, ny, cell };
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) g.v[j * nx + i] = f.base(i * cell, j * cell, t);
  return g;
}

/** Add the cursor bumps to a grid, touching only the cells each bump reaches (cheap per frame). */
export function applyCursor(f: Field, g: Grid, p: Pointer, w: number, h: number) {
  if (!p) return;
  const R = f.cursorReach;
  for (const q of p) {
    if (q.s <= 0.002) continue;
    const cx = q.x * w, cy = q.y * h;
    const i0 = Math.max(0, Math.floor((cx - R) / g.cell)), i1 = Math.min(g.nx - 1, Math.ceil((cx + R) / g.cell));
    const j0 = Math.max(0, Math.floor((cy - R) / g.cell)), j1 = Math.min(g.ny - 1, Math.ceil((cy + R) / g.cell));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) g.v[j * g.nx + i] += f.cursor(i * g.cell, j * g.cell, [q]);
  }
}

/** Marching squares + segment stitching over a grid. Returns one path `d` per level. */
export function contoursFromGrid(levels: number[], g: Grid): string[] {
  const { v, nx, ny, cell } = g;
  return levels.map((L) => {
    const segs: number[][] = [];
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const a = v[j * nx + i], b = v[j * nx + i + 1], c = v[(j + 1) * nx + i + 1], e = v[(j + 1) * nx + i];
      const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x = i * cell, y = j * cell;
      const T = [x + (cell * (L - a)) / (b - a), y], R = [x + cell, y + (cell * (L - b)) / (c - b)];
      const B = [x + (cell * (L - e)) / (c - e), y + cell], Le = [x, y + (cell * (L - a)) / (e - a)];
      const E = [T, R, B, Le];
      for (const [e0, e1] of CASES[idx]) segs.push([E[e0][0], E[e0][1], E[e1][0], E[e1][1]]);
    }
    return stitch(segs);
  });
}

/** One-shot contours (used for the server-rendered first frame). */
export function contourPaths(f: Field, w: number, h: number, cell: number, t: number): string[] {
  return contoursFromGrid(f.levels, sampleGrid(f, w, h, cell, t));
}

// Marching-squares cases: which cell edges a contour crosses. Edges: 0 top, 1 right, 2 bottom, 3 left.
const CASES: Record<number, [number, number][]> = {
  1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[0, 1]], 5: [[0, 3], [2, 1]], 6: [[0, 2]], 7: [[0, 3]],
  8: [[0, 3]], 9: [[0, 2]], 10: [[0, 1], [3, 2]], 11: [[0, 1]], 12: [[3, 1]], 13: [[2, 1]], 14: [[3, 2]],
};

function stitch(segs: number[][]): string {
  const key = (x: number, y: number) => `${Math.round(x * 4)},${Math.round(y * 4)}`;
  const ends = new Map<string, number[]>();
  segs.forEach((s, i) => {
    for (const k of [key(s[0], s[1]), key(s[2], s[3])]) {
      const arr = ends.get(k);
      arr ? arr.push(i) : ends.set(k, [i]);
    }
  });
  const used = new Uint8Array(segs.length);
  const take = (k: string) => {
    for (const i of ends.get(k) ?? []) if (!used[i]) return i;
    return -1;
  };
  let d = '';
  for (let s0 = 0; s0 < segs.length; s0++) {
    if (used[s0]) continue;
    used[s0] = 1;
    const line: number[][] = [[segs[s0][0], segs[s0][1]], [segs[s0][2], segs[s0][3]]];
    for (;;) {
      const [lx, ly] = line[line.length - 1], i = take(key(lx, ly));
      if (i < 0) break;
      used[i] = 1; const s = segs[i];
      line.push(key(s[0], s[1]) === key(lx, ly) ? [s[2], s[3]] : [s[0], s[1]]);
    }
    for (;;) {
      const [fx, fy] = line[0], i = take(key(fx, fy));
      if (i < 0) break;
      used[i] = 1; const s = segs[i];
      line.unshift(key(s[0], s[1]) === key(fx, fy) ? [s[2], s[3]] : [s[0], s[1]]);
    }
    if (line.length > 2) d += 'M' + line.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L');
  }
  return d;
}

/** Where a contour level crosses a ray from the minimum (for value labels). */
export function levelPoint(f: Field, level: number, angle: number, t: number, maxR: number): [number, number] | null {
  const { x: mx, y: my } = f.min, c = Math.cos(angle), s = Math.sin(angle);
  let a = 4, b = maxR;
  const at = (r: number) => f(mx + c * r, my + s * r, t);
  if (at(a) > level || at(b) < level) return null;
  for (let k = 0; k < 22; k++) { const m = (a + b) / 2; at(m) < level ? (a = m) : (b = m); }
  return [mx + c * a, my + s * a];
}

export type Walker = { x: number; y: number; vx: number; vy: number; pts: number[][]; still: number; rest: number; step: number };

/** One SGD-with-momentum step (with a little gradient noise). Mutates the walker. */
export function sgdStep(f: Field, wk: Walker, t: number, scale: number, p: Pointer = null) {
  const e = 1.2;
  const gx = (f(wk.x + e, wk.y, t, p) - f(wk.x - e, wk.y, t, p)) / (2 * e);
  const gy = (f(wk.x, wk.y + e, t, p) - f(wk.x, wk.y - e, t, p)) / (2 * e);
  const lr = 520 * scale, beta = 0.9, noise = 0.3 * scale;
  let ux = -gx * lr + (Math.random() - 0.5) * noise, uy = -gy * lr + (Math.random() - 0.5) * noise;
  const m = Math.hypot(ux, uy), cap = 1.1 * scale;
  if (m > cap) { ux *= cap / m; uy *= cap / m; }
  wk.vx = beta * wk.vx + ux; wk.vy = beta * wk.vy + uy;
  const sp = Math.hypot(wk.vx, wk.vy), vcap = 3.2 * scale;
  if (sp > vcap) { wk.vx *= vcap / sp; wk.vy *= vcap / sp; }
  wk.x += wk.vx; wk.y += wk.vy; wk.step++;
  wk.pts.push([wk.x, wk.y]);
  if (wk.pts.length > 420) wk.pts.shift();
  wk.still = Math.hypot(wk.vx, wk.vy) < 0.08 * scale ? wk.still + 1 : 0;
}
