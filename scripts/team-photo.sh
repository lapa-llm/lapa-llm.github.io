#!/bin/sh
# Turn any photo into a team avatar: centre-cropped square, 192x192 JPEG, in public/team/.
# Usage: scripts/team-photo.sh <image> <slug>     e.g. scripts/team-photo.sh ~/Downloads/me.png paniv
# Then set `photo: 'team/<slug>.jpg'` on that person in src/data/site.ts.
# Uses `sips`, which ships with macOS.
set -eu
[ $# -eq 2 ] || { echo "usage: $0 <image> <slug>" >&2; exit 1; }
in=$1; out="$(dirname "$0")/../public/team/$2.jpg"
w=$(sips -g pixelWidth "$in" | awk '/pixelWidth/ {print $2}')
h=$(sips -g pixelHeight "$in" | awk '/pixelHeight/ {print $2}')
s=$(( w < h ? w : h ))
sips -s format jpeg -s formatOptions 82 -c "$s" "$s" "$in" --out "$out" >/dev/null
sips -z 192 192 "$out" >/dev/null
echo "wrote public/team/$2.jpg"
