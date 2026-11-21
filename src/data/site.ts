
export type L = { uk: string; en: string };

export const links = {
  github: 'https://github.com/lapa-llm',
  repo: 'https://github.com/lapa-llm/lapa-llm',
  hf: 'https://huggingface.co/lapa-llm',
  demo: 'https://huggingface.co/spaces/lapa-llm/lapa',
  paper: 'https://aclanthology.org/2026.unlp-1.14/',
  paperPdf: 'https://aclanthology.org/2026.unlp-1.14.pdf',
  collection: 'https://huggingface.co/collections/lapa-llm/lapa-v012-release',
  pretrainData: 'https://huggingface.co/datasets/lapa-llm/pretraining-high-quality',
  leaderboard: 'https://huggingface.co/spaces/lang-uk/ukrainian-llm-leaderboard',
  telegram: 'https://t.me/lapallm',
  x: 'https://x.com/lapallm',
  lapathoniia: 'https://lapathoniia.top/',
  aiMeetups: 'https://t.me/ai_meetups_ukraine',
  mamay: 'https://huggingface.co/spaces/INSAIT-Institute/mamaylm-v1-blog',
  lapaWiki: 'https://uk.wikipedia.org/wiki/%D0%9B%D0%B0%D0%BF%D0%B0_%D0%92%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD_%D0%93%D1%80%D0%B8%D0%B3%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87',
  gmdhSource: 'https://people.idsia.ch/~juergen/DeepLearning2July2014.pdf',
};

export const stats: { value: string; label: L }[] = [
  { value: '12B', label: { uk: 'параметрів', en: 'parameters' } },
  { value: '1.5×', label: { uk: 'менше токенів для української, ніж у Gemma 3', en: 'fewer tokens for Ukrainian than Gemma 3' } },
  { value: '33', label: { uk: 'BLEU на FLORES (EN→UK)', en: 'BLEU on FLORES (EN→UK)' } },
  { value: '17', label: { uk: 'відкритих датасетів', en: 'open datasets' } },
  { value: '128K', label: { uk: 'токенів контексту', en: 'token context' } },
];

const hf = (id: string) => `https://huggingface.co/lapa-llm/${id}`;
const ds = (id: string) => `https://huggingface.co/datasets/lapa-llm/${id}`;

export const models: { id: string; url: string; tag: L; desc: L; latest?: boolean }[] = [
  {
    id: 'lapa-v0.1.3-instruct', url: hf('lapa-v0.1.3-instruct'), latest: true,
    tag: { uk: 'Інструктивна · 12B', en: 'Instruct · 12B' },
    desc: { uk: 'Остання версія: виправлення alignment, решта моделі без змін.', en: 'Latest release: alignment fixes, rest of the model unchanged.' },
  },
  {
    id: 'lapa-v0.1.2-instruct', url: hf('lapa-v0.1.2-instruct'),
    tag: { uk: 'Інструктивна · 12B', en: 'Instruct · 12B' },
    desc: { uk: 'Основний реліз. Доступна через Featherless, vLLM, SGLang і Docker Model Runner.', en: 'Main release. Available via Featherless, vLLM, SGLang and Docker Model Runner.' },
  },
  {
    id: 'lapa-v0.1.2-instruct-GGUF', url: hf('lapa-v0.1.2-instruct-GGUF'),
    tag: { uk: 'GGUF · локально', en: 'GGUF · local' },
    desc: { uk: 'Квантизовані ваги для llama.cpp, Ollama та LM Studio (Q4_K_M ≈ 7,3 ГБ).', en: 'Quantized weights for llama.cpp, Ollama and LM Studio (Q4_K_M ≈ 7.3 GB).' },
  },
  {
    id: 'lapa-12b-pt', url: hf('lapa-12b-pt'),
    tag: { uk: 'Базова · 12B', en: 'Base · 12B' },
    desc: { uk: 'Претренована базова модель, основа для власного донавчання.', en: 'Pretrained base model, a starting point for your own fine-tuning.' },
  },
  {
    id: 'tokenizer', url: hf('tokenizer'),
    tag: { uk: 'Токенізатор', en: 'Tokenizer' },
    desc: { uk: 'Адаптований токенізатор: 80 000 із 250 000 токенів замінено на українські.', en: 'Adapted tokenizer: 80,000 of 250,000 tokens replaced with Ukrainian ones.' },
  },
];

export const classifiers: { id: string; desc: L; url: string }[] = [
  { id: 'manipulative-score-model', desc: { uk: 'Маніпуляції та пропаганда', en: 'Manipulation and propaganda' } },
  { id: 'alignment-score-model', desc: { uk: 'Безпечність і alignment', en: 'Safety and alignment' } },
  { id: 'gec-score-model', desc: { uk: 'Граматична якість', en: 'Grammatical quality' } },
  { id: 'fineweb-mixtral-edu-score', desc: { uk: 'Освітня цінність (Mixtral)', en: 'Educational value (Mixtral)' } },
  { id: 'fineweb-nemotron-edu-score', desc: { uk: 'Освітня цінність (Nemotron)', en: 'Educational value (Nemotron)' } },
  { id: 'fasttext-quality-score', desc: { uk: 'Швидка оцінка якості (fastText)', en: 'Fast quality score (fastText)' } },
].map((c) => ({ ...c, url: hf(c.id) }));

export const datasets: { id: string; rows: string; kind: L; url: string }[] = [
  { id: 'pretraining-high-quality', rows: '16.7M', kind: { uk: 'Претренування', en: 'Pretraining' } },
  { id: 'pretraining-lower-quality', rows: '34.2M', kind: { uk: 'Претренування', en: 'Pretraining' } },
  { id: 'classifier_source', rows: '3M', kind: { uk: 'Класифікатори', en: 'Classifiers' } },
  { id: 'hermes3-uk', rows: '959k', kind: { uk: 'Інструкції', en: 'Instructions' } },
  { id: 'hermes3-en-fixed', rows: '959k', kind: { uk: 'Інструкції', en: 'Instructions' } },
  { id: 'fiftyfive-best', rows: '473k', kind: { uk: 'Інструкції', en: 'Instructions' } },
  { id: 'open-thoughts-114K-uk', rows: '114k', kind: { uk: 'Міркування', en: 'Reasoning' } },
  { id: 'EU-acts-uk-to-langs', rows: '3.06M', kind: { uk: 'Переклад', en: 'Translation' } },
  { id: 'antipropaganda-safe', rows: '5.13k', kind: { uk: 'Безпека', en: 'Safety' } },
  { id: 'impossible-questions', rows: '135', kind: { uk: 'Оцінювання', en: 'Evaluation' } },
].map((d) => ({ ...d, url: ds(d.id) }));

export const spaces: { name: string; url: string; desc: L }[] = [
  { name: 'Lapa Chat', url: 'https://huggingface.co/spaces/lapa-llm/lapa', desc: { uk: 'Чат з асистентом українською (текст і зображення)', en: 'Chat with the assistant in Ukrainian (text and images)' } },
  { name: 'J-Lens Explorer', url: 'https://huggingface.co/spaces/lapa-llm/lapa-j-lens-demo', desc: { uk: 'Інтерактивне дослідження внутрішніх представлень v0.1.2', en: 'Interactive Jacobian-lens explorer for v0.1.2' } },
  { name: 'Quality Estimation', url: 'https://huggingface.co/spaces/lapa-llm/quality-estimation', desc: { uk: 'Оцінка якості текстів класифікаторами Lapa', en: 'Score text quality with the Lapa classifiers' } },
];

export const communityModels: { name: string; url: string; desc: L }[] = [
  { name: 'lapa-ocr-lora', url: 'https://huggingface.co/VmF0x/lapa-ocr-lora', desc: { uk: 'LoRA для розпізнавання українського рукопису', en: 'LoRA for Ukrainian handwriting OCR' } },
  { name: 'Lapa-function-calling', url: 'https://huggingface.co/TymofiiNasobko/Lapa-function-calling', desc: { uk: 'Донавчання для виклику функцій', en: 'Fine-tune for function calling' } },
  { name: 'Ollama build', url: 'https://ollama.com/uamarchuan/lapa-v0.1.2-instruct', desc: { uk: 'Готова збірка для Ollama', en: 'Ready-made Ollama build' } },
];

export const news: { date: string; title: L; url: string }[] = [
  { date: '2026-06', title: { uk: 'Вийшла Lapa v0.1.3-instruct з виправленнями alignment', en: 'Lapa v0.1.3-instruct released with alignment fixes' }, url: hf('lapa-v0.1.3-instruct') },
  { date: '2026-05', title: { uk: 'Статтю про Lapa представлено на UNLP 2026 у Львові', en: 'Lapa paper presented at UNLP 2026 in Lviv' }, url: links.paper },
  { date: '2026-05', title: { uk: 'Lapathoniia, API для українських LLM, запущено в закритій беті', en: 'Lapathoniia, an API for Ukrainian LLMs, opens a closed beta' }, url: 'https://dou.ua/lenta/news/in-ukraine-launch-lapathoniia/' },
  { date: '2026-01', title: { uk: 'LAPATHON 2026: три треки й призовий фонд 7 500 $', en: 'LAPATHON 2026: three tracks and a $7,500 prize pool' }, url: 'https://dev.ua/news/ai-tiutor-dlia-mrii-ahent-samonavchannia-ta-detektor-koruptsii-dlia-nabu-na-lapathon-2026-rozihraly-pryzovyi-fond-u-9500-1769504257' },
  { date: '2025-12', title: { uk: 'Запущено Ukrainian LLM Leaderboard для порівняння моделей на українських бенчмарках', en: 'Ukrainian LLM Leaderboard launched to compare models on Ukrainian benchmarks' }, url: links.leaderboard },
  { date: '2025-11-13', title: { uk: 'Опубліковано всі дані претренування та моделі фільтрації', en: 'All pretraining data and filtering models published' }, url: links.pretrainData },
  { date: '2025-11-03', title: { uk: 'Опубліковано всі інструктивні датасети', en: 'All instruction datasets published' }, url: links.collection },
  { date: '2025-10-25', title: { uk: 'Реліз Lapa LLM v0.1.2', en: 'Lapa LLM v0.1.2 released' }, url: links.repo },
  { date: '2025-10-24', title: { uk: 'Вийшов препринт MATT, методу перенесення токенізатора Миколи Гальтюка', en: 'Preprint of MATT, Mykola Haltiuk’s tokenizer transfer method' }, url: 'https://arxiv.org/abs/2510.21954' },
];

export const grants: { name: string; what: L; id?: string }[] = [
  { name: 'Comand.AI', what: { uk: 'Обчислювальні ресурси для тренування', en: 'Compute for training' } },
  { name: 'ELEKS', what: { uk: 'Грант пам’яті Олексія Скрипника', en: 'Grant in memory of Oleksiy Skrypnyk' } },
  { name: 'EuroHPC', what: { uk: 'Обчислювальний грант', en: 'Compute grant' }, id: 'EHPC-BEN-2025B12-043' },
  { name: 'Talents for Ukraine · KSE', what: { uk: 'Грант на обчислювальні ресурси', en: 'Compute grant' } },
  { name: 'PLGrid · ACK Cyfronet AGH', what: { uk: 'Обчислювальний грант', en: 'Compute grant' }, id: 'PLG/2025/018285' },
  { name: 'Hugging Face', what: { uk: 'Безкоштовна корпоративна підписка для моделей і датасетів', en: 'Free enterprise plan for models and datasets' } },
];

export const orgs = {
  ucu: { uk: 'УКУ', en: 'UCU' },
  lpnu: { uk: 'Львівська політехніка', en: 'Lviv Polytechnic' },
  agh: { uk: 'AGH, Краків', en: 'AGH University' },
  kse: { uk: 'KSE', en: 'KSE' },
  kpi: { uk: 'КПІ ім. Сікорського', en: 'Igor Sikorsky KPI' },
  aarhus: { uk: 'Орхуський університет', en: 'Aarhus University' },
} satisfies Record<string, L>;

export const cities = {
  lviv: { name: { uk: 'Львів', en: 'Lviv' }, at: [24.03, 49.84] },
  kyiv: { name: { uk: 'Київ', en: 'Kyiv' }, at: [30.52, 50.45] },
  krakow: { name: { uk: 'Краків', en: 'Kraków' }, at: [19.94, 50.06] },
  uzhhorod: { name: { uk: 'Ужгород', en: 'Uzhhorod' }, at: [22.29, 48.62] },
  aarhus: { name: { uk: 'Орхус', en: 'Aarhus' }, at: [10.2, 56.16] },
} satisfies Record<string, { name: L; at: [number, number] }>;

export const orgCity: Record<keyof typeof orgs, keyof typeof cities> = {
  ucu: 'lviv', lpnu: 'lviv', agh: 'krakow', kse: 'kyiv', kpi: 'kyiv', aarhus: 'aarhus',
};

export type Person = {
  name: L;
  role?: L;
  org?: keyof typeof orgs | L;
  photo?: string;
  hf?: string;
  github?: string;
  scholar?: string;
  orcid?: string;
  linkedin?: string;
  site?: string;
  bio?: L;
  past?: boolean;
  hidden?: boolean;
  city?: keyof typeof cities;
};

export const team: Person[] = [
  { name: { uk: 'Юрій Панів', en: 'Yurii Paniv' }, photo: 'team/paniv.jpg', role: { uk: 'Керівник проєкту', en: 'Project lead' }, org: 'ucu', hf: 'robinhad', github: 'robinhad', scholar: 'https://scholar.google.com/citations?user=iUMYDLkAAAAJ', linkedin: 'https://www.linkedin.com/in/yurii-paniv-aa969b151/', site: 'https://robinhad.github.io' },
  { name: { uk: 'Богдан Діденко', en: 'Bohdan Didenko' }, past: true, photo: 'team/didenko.jpg', role: { uk: 'Адаптація токенізатора і тренування моделі', en: 'Tokenizer adaptation and model training' }, org: 'lpnu', hf: 'transhumanist-already-exists', github: 'BogdanDidenko', linkedin: 'https://www.linkedin.com/in/didenkobogdan/',
    scholar: 'https://scholar.google.com/citations?user=Kj-mmWgAAAAJ' },
  { name: { uk: 'Микола Гальтюк', en: 'Mykola Haltiuk' }, photo: 'team/haltiuk.jpg', role: { uk: 'Перенесення токенізатора, мовна адаптація', en: 'Tokenizer transfer, language adaptation' }, org: 'agh', hf: 'Goader', github: 'Goader', linkedin: 'https://www.linkedin.com/in/mykola-haltiuk/',
    scholar: 'https://scholar.google.com/citations?user=xVy61sMAAAAJ' },
  { name: { uk: 'Владислав Гуменний', en: 'Vladyslav Humennyy' }, past: true, photo: 'team/humennyy.jpg', role: { uk: 'Персона моделі', en: 'Model persona' }, org: 'ucu', hf: 'VladyslavH', github: 'Tuchis',
    linkedin: 'https://www.linkedin.com/in/vladyslav-humennyy/',
    scholar: 'https://scholar.google.com/citations?user=MsV9IRIAAAAJ' },
  { name: { uk: 'Андріан Кравченко', en: 'Andrian Kravchenko' }, past: true, photo: 'team/kravchenko.jpg', role: { uk: 'Синтетичні дані для alignment', en: 'Synthetic data for alignment' }, org: 'ucu', hf: 'andrian-kr', github: 'andrian-kr', linkedin: 'https://www.linkedin.com/in/andrian-kravchenko/',
    scholar: 'https://scholar.google.com/citations?user=KeXqWPcAAAAJ' },
  { name: { uk: 'Роман Кислий', en: 'Roman Kyslyi' }, past: true, photo: 'team/kyslyi.jpg', role: { uk: 'Код, математика і function calling', en: 'Coding, math and function calling' }, org: 'kse', hf: 'woters', linkedin: 'https://www.linkedin.com/in/romankyslyi/',
    scholar: 'https://scholar.google.com/citations?user=1zuUJXkAAAAJ' },
  { name: { uk: 'Артем Орловський', en: 'Artem Orlovskyi' }, photo: 'team/orlovskyi.jpg', role: { uk: 'Дані для alignment і бенчмарки function calling', en: 'Alignment data and function-calling benchmarks' }, org: 'kpi', hf: 'artem-orlovskyi',
    linkedin: 'https://www.linkedin.com/in/artem-orlovskyi/' },
  { name: { uk: 'Богдан Рубан', en: 'Bohdan Ruban' }, past: true, role: { uk: 'Синтетичні дані для інструктивного донавчання', en: 'Synthetic instruction-tuning data' }, org: 'ucu', hf: 'iamthewalrus67', github: 'iamthewalrus67',
    linkedin: 'https://www.linkedin.com/in/bohdan-ruban-015240228/' },
  { name: { uk: 'Максим-Юрій Рудько', en: 'Maksym-Yurii Rudko' }, past: true, photo: 'team/rudko.jpg', role: { uk: 'Аудіодані для претренування', en: 'Audio data for pretraining' }, org: 'ucu', hf: 'JustQuiteMadMax', github: 'JustMax10001001',
    linkedin: 'https://www.linkedin.com/in/maksym-yurii-rudko-b7848011a/' },
  { name: { uk: 'Анастасія Сеник', en: 'Anastasiia Senyk' }, past: true, photo: 'team/senyk.jpg', role: { uk: 'Шаблонні інструктивні датасети', en: 'Templated instruction datasets' }, org: 'ucu', github: 'anastasiasenyk',
    linkedin: 'https://www.linkedin.com/in/anastasiiasenyk/',
    scholar: 'https://scholar.google.com/citations?user=CkPtv4cAAAAJ' },
  { name: { uk: 'Назарій Друщак', en: 'Nazarii Drushchak' }, past: true, photo: 'team/drushchak.jpg', role: { uk: 'Alignment', en: 'Alignment' }, city: 'lviv',
    org: { uk: 'Аспірант УКУ, AI Technical Consultant у SoftServe', en: 'PhD Candidate @ UCU & AI Technical Consultant @ SoftServe' },
    hf: 'ndrushchak', github: 'naz2001r', linkedin: 'https://www.linkedin.com/in/nazarii-drushchak/',
    scholar: 'https://scholar.google.com/citations?user=qh173i0AAAAJ' },
  { name: { uk: 'Дмитро Чаплинський', en: 'Dmytro Chaplynskyi' }, past: true, photo: 'team/chaplynskyi.jpg', role: { uk: 'Дані для претренування і перекладу', en: 'Pretraining and translation data' }, org: 'ucu', hf: 'dchaplinsky', github: 'dchaplinsky',
    scholar: 'https://scholar.google.com/citations?user=v4UB9oAAAAAJ' },
  { name: { uk: 'Мар’яна Романишин', en: 'Mariana Romanyshyn' }, past: true, city: 'kyiv', role: { uk: 'Alignment', en: 'Alignment' }, org: { uk: 'Експертка в Комітеті з питань розвитку сфери ШІ в Україні при Міністерстві цифрової трансформації', en: 'Expert on the Committee for the Development of AI in Ukraine at the Ministry of Digital Transformation' }, photo: 'team/romanyshyn.jpg',
    hf: 'mariana-scorp', github: 'mariana-scorp', scholar: 'https://scholar.google.com/citations?user=yji2ZvIAAAAJ', linkedin: 'https://www.linkedin.com/in/mariana-romanyshyn-b5896529/',
    bio: { uk: 'Комп’ютерна лінгвістка, науковиця. Популяризую українське NLP, працюю над цифровізацією держави та впровадженням ШІ в громадському секторі. Радниця з питань ШІ у ГО “Спільномова”, членкиня AI HOUSE Board, співорганізаторка UNLP, експертка в Комітеті з питань розвитку сфери ШІ в Україні при Міністерстві цифрової трансформації.', en: 'Computational linguist and researcher. I advocate for Ukrainian NLP and work on digital transformation in government and AI adoption in the nonprofit sector. AI adviser at the NGO Spilnomova, AI HOUSE Board member, UNLP co-organizer, expert on the Committee for the Development of AI in Ukraine at the Ministry of Digital Transformation.' } },

  { name: { uk: 'Євген Костюк', en: 'Yevhen Kostiuk' }, photo: 'team/kostiuk.jpg', role: { uk: 'Культурне вирівнювання', en: 'Cultural alignment' }, org: 'aarhus',
    hf: 'yevhenkost', scholar: 'https://scholar.google.com/citations?user=S1jmtWcAAAAJ', linkedin: 'https://www.linkedin.com/in/yevhen-kostiuk-491279175/',
    bio: { uk: 'Культурне вирівнювання, підготовка даних, моральна підтримка, шанувальник Подерв’янського.', en: 'Cultural alignment, data preparation, moral support, Podervianskyi enjoyer.' } },
  { name: { uk: 'Марія Онищук', en: 'Mariia Onyshchuk' }, photo: 'team/onyshchuk.jpg', org: 'ucu',
    role: { uk: 'Роутинг між українськими open-source моделями', en: 'Routing between Ukrainian open-source models' },
    hf: 'MariaOnyshchuk', github: 'MariaOnyshchuk', orcid: '0009-0008-6311-8782', linkedin: 'https://www.linkedin.com/in/mariia-onyshchuk-230a5633b/',
    bio: {
      uk: 'Студентка УКУ, дослідниця у сфері NLP. Досліджую, на що здатна комбінація малих моделей в одній системі. Брала участь у дослідженні Responsible AI: працювала над виявленням пропаганди за допомогою AI. Зараз у команді Lapa LLM тестую українські open-source моделі та роутинг між ними. Цікавлюся статистикою і математикою, працюю над розробкою та покращенням AI-систем.',
      en: 'I’m a student at the Ukrainian Catholic University (UCU) and an NLP researcher, discovering what a combination of small models in one system is capable of. I took part in Responsible AI research on detecting propaganda with AI. Now I’m on the Lapa LLM team, where I benchmark Ukrainian open-source models and routing between them. I’m interested in statistics and math and work on building and improving AI systems.',
    } },
  { name: { uk: 'Михайло Івасюк', en: 'Mykhailo Ivasiuk' }, photo: 'team/ivasiuk.jpg', org: 'ucu', linkedin: 'https://www.linkedin.com/in/mykhailo-ivasiuk/' },
  { name: { uk: 'Вікторія Маковська', en: 'Viktoriia Makovska' }, photo: 'team/makovska.jpg', role: { uk: 'LLM Unlearning', en: 'LLM Unlearning' }, org: 'ucu', hf: 'reirei01', github: 'reirei-00', scholar: 'https://scholar.google.com/citations?user=UUR3TbAAAAAJ', linkedin: 'https://www.linkedin.com/in/victoriadiachenko/', site: 'https://reirei-00.github.io/makovska-page/about/' },
  { name: { uk: 'Данило Ворвуль', en: 'Danylo Vorvul' }, photo: 'team/vorvul.jpg', role: { uk: 'Доменний пост-тренінг', en: 'Domain-specific post-training' },
    org: { uk: 'КПІ / YTC.company', en: 'KPI / YTC.company' }, city: 'uzhhorod',
    hf: 'v0d4', github: 'WorldInnovationsDepartment', orcid: '0009-0009-5822-9063', linkedin: 'https://www.linkedin.com/in/danylo-vorvul/', site: 'https://danylovorvul.com/' },
  { name: { uk: 'Юліана Гринда', en: 'Yuliana Hrynda' }, photo: 'team/hrynda.jpg', role: { uk: 'Дослідження персон LLM', en: 'Research on LLM personas' },
    org: { uk: 'Студентка УКУ, AI engineer у Superagent AI', en: 'CS student at UCU, AI engineer at Superagent AI' }, city: 'lviv',
    linkedin: 'https://www.linkedin.com/in/yuliana-hrynda-854808289' },
];

export const leaderboard = {
  title: 'Ukrainian LLM Leaderboard',
  by: 'lang-uk · Hugging Face',
  url: 'https://huggingface.co/spaces/lang-uk/ukrainian-llm-leaderboard',
  results: 'https://huggingface.co/datasets/lang-uk/ukrainian-llm-leaderboard-results',
  code: 'https://github.com/lang-uk/ukrainian-llm-leaderboard',
  desc: {
    uk: 'Відкритий лідерборд, що порівнює мовні моделі на українських бенчмарках, тих самих, якими ми користувалися під час розробки Lapa.',
    en: 'An open leaderboard that compares language models on Ukrainian benchmarks, the same ones we used while developing Lapa.',
  },
  categories: [
    { uk: 'Справедливість', en: 'Fairness' },
    { uk: 'Машинний переклад', en: 'Machine translation' },
    { uk: 'Сумаризація', en: 'Summarization' },
    { uk: 'Відповіді на запитання за контекстом', en: 'In-context question answering' },
    { uk: 'Міркування та знання', en: 'Reasoning and knowledge' },
    { uk: 'Математика', en: 'Math' },
    { uk: 'Виконання інструкцій', en: 'Instruction following' },
  ],
};

export const matt = {
  title: 'MATT: Model-Aware Tokenizer Transfer',
  authors: 'Mykola Haltiuk, Aleksander Smywiński-Pohl · AGH University of Krakow',
  arxiv: 'https://arxiv.org/abs/2510.21954',
  code: 'https://github.com/Goader/matt',
  label: { uk: 'NeurIPS 2026', en: 'NeurIPS 2026' },
  short: {
    uk: 'Метод перенесення токенізатора, що зберігає здатності моделі: Attention Influence Modeling переносить патерни уваги з оригінальної моделі на модель з новим токенізатором.',
    en: 'A tokenizer transfer method that keeps the model’s abilities: Attention Influence Modeling distills attention patterns from the original model into the one with a new tokenizer.',
  },
  summary: {
    uk: 'Щоб змінити токенізатор готової LLM, зазвичай ініціалізують нові ембединги за схожістю токенів, і модель утрачає більшу частину здатності генерувати текст. MATT натомість використовує внутрішню поведінку моделі: ціль Attention Influence Modeling (AIM) переносить патерни уваги з оригінальної моделі («вчителя») на модель з новим токенізатором («учня»). Це швидкий розігрів перед звичайним мовним моделюванням.',
    en: 'Changing the tokenizer of a pretrained LLM usually means initializing new embeddings from token similarity, and the model loses most of its ability to generate text. MATT uses the model’s own internals instead: the Attention Influence Modeling (AIM) objective distills attention patterns from the original model (teacher) into the model with the new tokenizer (student). It acts as a fast warm-up before standard language modeling.',
  },
  steps: [
    { uk: 'Текст токенізується обома токенізаторами й ділиться на спільні сегменти символів', en: 'Text is tokenized with both tokenizers and split into shared character segments' },
    { uk: 'Нові ембединги ініціалізуються методом FOCUS', en: 'New embeddings are initialized with FOCUS' },
    { uk: 'Ембединги учня навчаються відтворювати виходи уваги вчителя (достатньо ~1/3 шарів)', en: 'Student embeddings learn to match the teacher’s attention outputs (only ~1/3 of layers needed)' },
  ],
  setup: {
    uk: 'Gemma 3 12B PT → розширений український токенізатор: словник 262K → 387K, стиснення 2,98 → 4,44, у 1,5 раза швидший інференс (до 1,8× на довгих послідовностях).',
    en: 'Gemma 3 12B PT → extended Ukrainian tokenizer: vocab 262K → 387K, compression 2.98 → 4.44, 1.5× faster inference (up to 1.8× on long sequences).',
  },
  table: {
    head: { uk: ['Метод', 'Час', 'Класиф.', 'Генер.'], en: ['Method', 'Time', 'Disc.', 'Gen.'] },
    rows: [
      ['Gemma 3 12B PT (original)', '', '78.18', '8.13'],
      ['FOCUS', '', '42.96', '0.70'],
      ['Transtokenizers', '', '53.96', '0.05'],
      ['FOCUS + NTP', '7h', '73.78', '3.96'],
      ['MATT', '7h', '77.27', '6.45'],
    ],
  },
  recovery: [
    { label: { uk: 'Класифікаційні задачі', en: 'Discriminative tasks' }, matt: 99, ntp: 94 },
    { label: { uk: 'Генеративні задачі', en: 'Generative tasks' }, matt: 79, ntp: 49 },
  ],
  note: {
    uk: 'Частка відновленої якості оригінальної моделі за однакового бюджету (7 GPU-годин). Класифікаційні: Belebele, Global MMLU; генеративні: Long FLORES, WMT, XL-Sum.',
    en: 'Share of the original model’s quality recovered at the same budget (7 GPU hours). Discriminative: Belebele, Global MMLU; generative: Long FLORES, WMT, XL-Sum.',
  },
  labels: { uk: { matt: 'MATT', ntp: 'FOCUS + NTP', title: 'Відновлення якості' }, en: { matt: 'MATT', ntp: 'FOCUS + NTP', title: 'Quality recovered' } },
};

export const mattBibtex = `@inproceedings{haltiuk2026matt,
  title         = "Model-Aware Tokenizer Transfer",
  author        = "Haltiuk, Mykola and Smywi{\\'n}ski-Pohl, Aleksander",
  booktitle     = "Advances in Neural Information Processing Systems (NeurIPS 2026)",
  year          = "2026",
  eprint        = "2510.21954",
  archivePrefix = "arXiv",
  url           = "https://arxiv.org/abs/2510.21954"
}`;

export const bibtex = `@inproceedings{paniv-etal-2026-data,
  title     = "Data-Efficient Adaptation of Multilingual {LLM}s to {U}krainian",
  author    = "Paniv, Yurii and Didenko, Bohdan and Haltiuk, Mykola and
               Humennyy, Vladyslav and Kravchenko, Andrian and Kyslyi, Roman and
               Makovska, Viktoriia and Orlovskyi, Artem and Ruban, Bohdan and
               Rudko, Maksym-Yurii and Senyk, Anastasiia and Drushchak, Nazarii and
               Chaplynskyi, Dmytro and Romanyshyn, Mariana",
  booktitle = "Proceedings of the Fifth {U}krainian Natural Language Processing
               Conference ({UNLP} 2026)",
  month     = may,
  year      = "2026",
  address   = "Lviv, Ukraine",
  publisher = "Association for Computational Linguistics",
  url       = "https://aclanthology.org/2026.unlp-1.14/",
  pages     = "155--168"
}`;

export const snippets: { id: string; label: string; lang: string; code: string }[] = [
  {
    id: 'transformers', label: 'Transformers', lang: 'python',
    code: `# pip install -U transformers accelerate
import torch
from transformers import pipeline

pipe = pipeline(
    "image-text-to-text",
    model="lapa-llm/lapa-v0.1.3-instruct",
    device_map="auto",
    dtype=torch.bfloat16,
)

messages = [{"role": "user", "content": [
    {"type": "text", "text": "Яка найвища гора в Україні?"}
]}]
out = pipe(text=messages, max_new_tokens=200)
print(out[0]["generated_text"][-1]["content"])`,
  },
  { id: 'ollama', label: 'Ollama', lang: 'bash', code: `ollama run hf.co/lapa-llm/lapa-v0.1.2-instruct-GGUF` },
  { id: 'vllm', label: 'vLLM', lang: 'bash', code: `pip install vllm\nvllm serve lapa-llm/lapa-v0.1.3-instruct --max-model-len 32768` },
  { id: 'docker', label: 'Docker', lang: 'bash', code: `docker model run hf.co/lapa-llm/lapa-v0.1.2-instruct-GGUF` },
];
