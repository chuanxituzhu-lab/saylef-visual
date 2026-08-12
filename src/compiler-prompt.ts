import type { PromptLanguage } from "./contracts/provider.js";
import type { VisualIntent } from "./contracts/visual-intent.js";

const EMOTION_EN: Record<string, string> = {
  "等待": "waiting", "思念": "longing", "归来": "returning", "归属": "belonging",
  "安定": "grounded", "温暖": "warmth", "独处": "solitude", "新生": "renewal",
  "释然": "release", "守候": "watchful care", "清凉": "cool clarity", "期待": "hope"
};
const EMOTION_ZH: Record<string, string> = {
  waiting: "等待", longing: "思念", returning: "归来", belonging: "归属",
  grounded: "安定", warmth: "温暖", solitude: "独处", renewal: "新生",
  release: "释然", "watchful care": "守候", "cool clarity": "清凉", hope: "期待"
};
const HERO_ZH: Record<string, string> = {
  "a small ivory rural cottage": "一间象牙白的小屋",
  "a solitary old tree beside a quiet dwelling": "一棵独处在静屋旁的古树",
  "a simple whitewashed mountain home": "一间素白的山间小屋"
};
const ENTRANCE_ZH: Record<string, string> = {
  "a restrained winding stone path": "一条克制而蜿蜒的石径",
  "a short flight of weathered stone steps": "一小段被岁月磨亮的石阶",
  "a narrow path entering from the foreground": "一条从前景进入的窄路"
};
const COLOR_ZH: Record<string, string> = {
  "warm pure ivory": "温暖纯净的象牙白", "clean snow ivory": "干净的雪白象牙色",
  "luminous spring green": "明亮的春日嫩绿", "brilliant emerald green": "鲜亮的翠绿",
  "pure golden yellow": "高纯度金黄", "clear sky blue": "清澈的天青蓝",
  "deep charcoal": "深沉稳定的墨黑", "pure vermilion red": "纯正朱红",
  "clear cobalt blue": "清澈钴蓝", "pure vermilion": "纯正朱红"
};

function removeEllipsis(value: string): string {
  return String(value).replace(/\.{2,}|\u2026+/g, " ").replace(/\s+/g, " ").trim();
}

function chinese(value: string, fallback: string): string {
  const text = removeEllipsis(value).replace(/[A-Za-z0-9]/g, "").trim();
  return text || fallback;
}

function english(value: string, fallback: string): string {
  const text = removeEllipsis(value)
    .replace(/[\u3400-\u9fff]/g, " ")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text || fallback;
}

function supportZh(values: string[]): string {
  return values.map((value) => value.includes("seasonal tree") ? "一棵有尺度感的季节古树" : chinese(value, "一处安静的辅助景物")).join("、");
}

function supportEn(values: string[]): string {
  return values.map((value) => english(value, "one quiet supporting element")).join(", ");
}

export function compileBasePrompt(intent: VisualIntent, language: PromptLanguage = "zh"): string {
  const ratio = intent.format.ratio;
  const titleZh = chinese(intent.narrative.title, "这一刻很安静");
  const titleEn = english(intent.narrative.title, "a quiet moment");
  const emotionZh = EMOTION_ZH[intent.narrative.emotion] || chinese(intent.narrative.emotion, "安定");
  const emotionEn = EMOTION_EN[intent.narrative.emotion] || english(intent.narrative.emotion, "grounded");
  const momentZh = chinese(intent.narrative.moment, "光落在安静的屋檐上");
  const momentEn = english(intent.narrative.moment, "first light touches the quiet refuge");
  const hookZh = chinese(intent.narrative.hook, "一条小路通向安静的去处");
  const hookEn = english(intent.narrative.hook, "one clear path enters a quiet refuge");
  const heroZh = HERO_ZH[intent.scene.hero] || chinese(intent.scene.hero, "一处安静的疗愈空间");
  const heroEn = english(intent.scene.hero, "a quiet restorative refuge");
  const entranceZh = ENTRANCE_ZH[intent.scene.entrance] || chinese(intent.scene.entrance, "一条从前景进入的安静路径");
  const entranceEn = english(intent.scene.entrance, "one clear path entering from the foreground");
  const baseZh = COLOR_ZH[intent.color.base] || chinese(intent.color.base, "温暖象牙白");
  const primaryZh = COLOR_ZH[intent.color.primary] || chinese(intent.color.primary, "高纯度季节色");
  const structureZh = COLOR_ZH[intent.color.structure] || chinese(intent.color.structure, "深沉墨黑");
  const accentZh = COLOR_ZH[intent.color.accent] || chinese(intent.color.accent, "纯正朱红");
  const scenarioZh = chinese(intent.healing.label, "安静疗愈");
  const cueZh = chinese(intent.healing.cue, "让呼吸慢下来");
  const scenarioEn = english(intent.healing.labelEn, "quiet restoration");
  const cueEn = english(intent.healing.cueEn, "let the breathing slow down");
  const timeLabelZh = chinese(intent.time.label, "清晨");
  const timeLabelEn = english(intent.time.labelEn, "early morning");
  const timeLightZh = chinese(intent.time.light, "第一束光落到安静的屋檐上");
  const timeLightEn = english(intent.time.lightEn, "the first light touches the quiet eaves");
  const negative = compileNegativePrompt(language);

  if (language === "en") {
    return [
      "Create a " + ratio + " visual storytelling artwork. Metadata title: " + titleEn + ". Do not render the title in the image.",
      "Emotion: " + emotionEn + ". Story moment: " + momentEn + ".",
      "Time point: " + timeLabelEn + ". Light behavior: " + timeLightEn + ".",
      "Healing scene: " + scenarioEn + ". Restorative cue: " + cueEn + ". Keep the emotional support quiet, safe and non-clinical.",
      "Visual hook: " + hookEn + ". Keep the ending unresolved and contemplative.",
      "Hero subject: " + heroEn + ". Entrance into the image: " + entranceEn + ". Supporting element: " + supportEn(intent.scene.supportingElements) + ".",
      "Composition Lock: exactly one focal point, one clear entrance, immersive foreground-to-background depth, and about " + Math.round(intent.composition.negativeSpace * 100) + " percent breathing space.",
      "Color Lock: six parts cinematic spatial storytelling and four parts high-purity pigment language. Use warm ivory, deep charcoal, one vivid seasonal color and one clear accent. Use clean pigment steps instead of gray-green photographic gradients.",
      "Material Lock: watercolor transparency, gouache opacity, acrylic impasto, restrained palette-knife texture, subtle bas-relief and visible handmade paint accumulation.",
      "Mood: healing, serene, fresh and poetic. Cinematic in space and light but unmistakably painterly, never ordinary photography or glossy three-dimensional rendering.",
      "Image policy: no text, Chinese characters, English letters, numbers, title, caption, calligraphy, seal, stamp, signature, watermark or logo in the artwork layer. The title is metadata only.",
      "Negative prompt: " + negative + "."
    ].join(" ");
  }

  return [
    "生成 " + ratio + " 的东方疗愈叙事画面。标题仅作为元数据：" + titleZh + "，不要把标题画入图像。",
    "情绪：" + emotionZh + "。故事时刻：" + momentZh + "。",
    "时间点：" + timeLabelZh + "。光线表现：" + timeLightZh + "。",
    "疗愈情景：" + scenarioZh + "。疗愈提示：" + cueZh + "。情绪支持保持安静、安全、非医疗化。",
    "视觉钩子：" + hookZh + "。结尾保持未完成，让画面留下余韵。",
    "主体：" + heroZh + "。进入路径：" + entranceZh + "。辅助元素：" + supportZh(intent.scene.supportingElements) + "。",
    "构图锁：只有一个焦点、一条清晰入口、前景到远景的沉浸层次，留白约占百分之三十八。",
    "色彩锁：六成空间叙事，四成高纯颜料语言。使用温暖象牙白、深沉墨黑、一种鲜明季节色和一种清晰强调色，使用干净色阶，不要灰绿色摄影渐变。",
    "材质锁：水彩透明感、厚水粉覆盖、丙烯堆积、克制的刮刀纹理、轻微浮雕感和可见的手工颜料痕迹。",
    "气质：治愈、安静、清新、诗意。空间和光线具有电影感，但必须明确是手工绘画，不是普通摄影或光滑三维渲染。",
    "画面层规则：禁止文字、汉字、英文字母、数字、标题、题款、书法、印章、印记、签名、水印和标志。标题只保留在元数据中。",
    "负面提示：" + negative + "。"
  ].join(" ");
}

export function compileNegativePrompt(language: PromptLanguage = "zh"): string {
  if (language === "en") {
    return [
      "cluttered composition", "too many flowers", "too many buildings", "multiple focal points",
      "gray cast", "muddy colors", "low saturation", "vintage filter", "sepia",
      "plastic three-dimensional render", "photorealistic photography", "cinematic photo",
      "ordinary landscape photography", "glossy CGI", "generic AI concept art",
      "gray-green photographic gradients", "over-detailed distant scenery", "decorative clutter",
      "any text", "Chinese characters", "English letters", "numbers", "title", "caption",
      "calligraphy", "seal", "stamp", "signature", "watermark", "logo", "ellipsis", "three dots"
    ].join(", ");
  }
  return [
    "构图杂乱", "花朵过多", "建筑过多", "多个焦点", "灰暗色罩", "浑浊混色",
    "低饱和度", "复古滤镜", "棕黄色滤镜", "塑料三维渲染", "普通摄影", "摄影化电影截图",
    "光滑计算机图像", "通用人工智能概念图", "灰绿色摄影渐变", "远景细节过多", "装饰堆积",
    "任何文字", "汉字", "英文字母", "数字", "标题", "题款", "书法", "印章", "印记",
    "签名", "水印", "标志", "省略号", "连续句点"
  ].join("、");
}

export const DEFAULT_NEGATIVE_PROMPT = compileNegativePrompt("en");
