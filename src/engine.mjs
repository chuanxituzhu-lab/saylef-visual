const freeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) freeze(child);
  }
  return value;
};

export const STYLE_DNA = freeze({
  version: 'style-dna/2.0',
  philosophy: '颜色浓烈，画面安静。',
  color: {
    hue_purity: 'high',
    saturation: 'high',
    brightness: 'high',
    gray_pollution: 'zero',
    base: 'warm pure ivory white',
    structure: 'deep stable charcoal black'
  },
  emotion: ['healing', 'serenity', 'freshness'],
  density: { visual_noise: 'low', negative_space: 'medium_high' },
  material: ['watercolor', 'gouache', 'acrylic impasto', 'palette knife', 'subtle relief'],
  rules: ['ONE EMOTION', 'ONE STORY', 'ONE MOMENT', 'ONE HOOK']
});

const SEASONS = {
  spring: {
    name: '春',
    time: 'clear morning',
    weather: 'soft air after rain',
    space: 'quiet hillside village',
    imagery: ['new leaves', 'ivory cottage', 'stone path'],
    sound: 'distant birds',
    emotion: 'new beginning',
    mood: '新芽、清晨、相遇、出发',
    palette: ['fresh green', 'peach pink', 'vermilion', 'warm ivory']
  },
  summer: {
    name: '夏',
    time: 'quiet afternoon',
    weather: 'clear sky after rain',
    space: 'emerald valley',
    imagery: ['large tree canopy', 'cool stream', 'open red door'],
    sound: 'slow water',
    emotion: 'cool serenity',
    mood: '盛夏、树荫、清凉、回家',
    palette: ['vivid green', 'lake blue', 'vermilion', 'warm ivory']
  },
  autumn: {
    name: '秋',
    time: 'late afternoon',
    weather: 'quiet after rain',
    space: 'golden mountain village',
    imagery: ['wet stone path', 'old tree', 'half-open red door'],
    sound: 'distant water',
    emotion: 'quiet waiting',
    mood: '雨后、空山、暮色、归途',
    palette: ['pure golden yellow', 'bright orange', 'cobalt blue', 'warm ivory']
  },
  winter: {
    name: '冬',
    time: 'blue hour',
    weather: 'first clean snow',
    space: 'small snow village',
    imagery: ['snow path', 'dark roof', 'one warm window'],
    sound: 'near silence',
    emotion: 'warm guardianship',
    mood: '初雪、深蓝、守候、灯还亮着',
    palette: ['snow white', 'sky blue', 'deep charcoal', 'vermilion']
  }
};

const STORIES = {
  spring: {
    title: '花开以前',
    emotion: 'hopeful waiting',
    micro_story: '门前的树还没有开花，但有人已经把小桌搬到了阳光下。',
    story_moment: '第一片新叶把光投到空着的椅子上',
    visual_hook: '一把空椅子正对着刚发芽的树',
    unresolved_question: '谁会先回来？'
  },
  summer: {
    title: '树荫下的家',
    emotion: 'quiet belonging',
    micro_story: '午后的热气退到山谷外，门一直开着，屋里没有人催促。',
    story_moment: '一束清凉的光落在门内的石阶上',
    visual_hook: '巨大翠绿树冠下唯一一扇半开的朱红门',
    unresolved_question: '门是在等谁？'
  },
  autumn: {
    title: '门还开着',
    emotion: 'quiet waiting',
    micro_story: '雨已经停了很久，那扇门却一直没有关。',
    story_moment: '夕阳第一次落到湿润的门前石阶',
    visual_hook: '满山金黄中唯一的一扇朱红门',
    unresolved_question: '在等谁？'
  },
  winter: {
    title: '灯还亮着',
    emotion: 'warm guardianship',
    micro_story: '村子睡着以后，河对岸仍有一盏灯替谁留着位置。',
    story_moment: '雪地里的脚印停在唯一亮着的窗前',
    visual_hook: '整座雪白村庄只有一扇窗透出暖黄',
    unresolved_question: '那盏灯会等到天亮吗？'
  }
};

const hashSeed = (value) => {
  let hash = 2166136261;
  for (const char of String(value)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const chooseSeason = (season, seed) => {
  if (season && season !== 'auto') return season;
  return ['spring', 'summer', 'autumn', 'winter'][hashSeed(seed) % 4];
};

export function createPoeticContext(request = {}) {
  const seed = request.seed ?? 42;
  const season = chooseSeason(request.season, seed);
  const preset = SEASONS[season];
  if (!preset) throw new Error(`Unsupported season: ${season}`);
  return {
    version: 'poetic-context/1.0',
    season,
    season_name: preset.name,
    time: preset.time,
    weather: preset.weather,
    space: preset.space,
    imagery: [...preset.imagery],
    sound: preset.sound,
    emotion_seed: request.emotion_hint || preset.emotion,
    poetic_mood: preset.mood,
    palette: [...preset.palette]
  };
}

export function createStory(context) {
  const story = STORIES[context.season];
  return {
    version: 'story/1.0',
    ...story,
    emotion: context.emotion_seed
  };
}

export function compileVisualIntent({ request = {}, context, story }) {
  const ratio = request.ratio || '3:4';
  return {
    version: 'visual-intent/1.0',
    style_dna: STYLE_DNA.version,
    narrative: {
      title: story.title,
      emotion: story.emotion,
      moment: story.story_moment,
      hook: story.visual_hook,
      open_ending: true,
      unresolved_question: story.unresolved_question
    },
    poetic_context: context,
    scene: {
      hero: context.season === 'winter' ? 'one warm-lit ivory cottage window' : 'one quiet ivory cottage',
      entrance: context.season === 'winter' ? 'snow path leading to the window' : 'simple stone path leading into the scene',
      supporting_elements: context.imagery.slice(0, 2)
    },
    composition: {
      focal_points: 1,
      negative_space: 0.38,
      visual_noise: 'low',
      depth: 'immersive',
      recompose: true,
      ratio
    },
    color: {
      hue_purity: 'high',
      saturation: 'high',
      brightness: 'high',
      base: 'warm ivory',
      primary: context.palette[0],
      structure: 'deep charcoal black',
      accent: context.palette[2]
    },
    material: [...STYLE_DNA.material],
    format: { ratio, recompose: true }
  };
}

export function validateVisualIntent(intent) {
  const issues = [];
  if (!intent?.narrative?.title || !intent?.narrative?.moment) issues.push('missing_narrative');
  if (intent?.narrative?.open_ending !== true) issues.push('story_must_remain_open');
  if (intent?.composition?.focal_points !== 1) issues.push('focal_points_must_equal_one');
  if (intent?.composition?.visual_noise !== 'low') issues.push('visual_noise_must_be_low');
  if ((intent?.composition?.negative_space ?? 0) < 0.3) issues.push('negative_space_below_threshold');
  if (intent?.color?.hue_purity !== 'high' || intent?.color?.saturation !== 'high' || intent?.color?.brightness !== 'high') {
    issues.push('color_dna_mismatch');
  }
  return {
    passed: issues.length === 0,
    score: Math.max(0, 100 - issues.length * 20),
    issues,
    action: issues.length ? 'regenerate' : 'continue'
  };
}

export function compileProviderPrompt(intent, provider = 'codex-host') {
  const prompt = [
    `Visual Intent ${intent.version}.`,
    `Create one ${intent.format.ratio} visual story titled “${intent.narrative.title}”.`,
    `Moment: ${intent.narrative.moment}.`,
    `Visual hook: ${intent.narrative.hook}.`,
    `Hero: ${intent.scene.hero}. Entrance: ${intent.scene.entrance}.`,
    `Use ${intent.color.primary}, ${intent.color.base}, ${intent.color.structure}, and one ${intent.color.accent} accent.`,
    'High-purity, high-saturation, luminous pigments; quiet composition; generous negative space; one focal point.',
    'Watercolor, gouache, acrylic impasto, palette-knife marks, subtle bas-relief texture; not photography.'
  ].join(' ');
  return {
    provider,
    prompt,
    negative_prompt: 'gray pollution, muddy colors, low saturation, vintage fade, clutter, multiple focal points, decorative overload, photorealism',
    ratio: intent.format.ratio,
    reserved: provider !== 'codex-host'
  };
}

export function createHostInvocationPlan(intent, provider = 'codex-host') {
  return {
    kind: 'host-invocation-plan/1.0',
    provider,
    status: 'ready',
    execution: 'host-managed',
    image_tool_required: true,
    prompt: compileProviderPrompt(intent, provider),
    note: 'The host decides which available image generation tool executes this plan.'
  };
}

export function runVisualStoryAgent(input = {}) {
  const request = {
    season: input.season || 'auto',
    emotion_hint: input.emotion_hint || '',
    user_idea: input.user_idea || '一个安静而有余韵的视觉故事',
    ratio: input.ratio || '3:4',
    provider: input.provider || 'codex-host',
    seed: input.seed ?? 42
  };
  const poetic_context = createPoeticContext(request);
  const story = createStory(poetic_context);
  const visual_intent = compileVisualIntent({ request, context: poetic_context, story });
  const guard = validateVisualIntent(visual_intent);
  return {
    request,
    poetic_context,
    story,
    visual_intent,
    guard,
    host_invocation_plan: guard.passed ? createHostInvocationPlan(visual_intent, request.provider) : null
  };
}

export { SEASONS };
