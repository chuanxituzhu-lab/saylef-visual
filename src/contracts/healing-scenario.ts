export type HealingScenarioId =
  | "rain-return"
  | "window-breath"
  | "tree-shade-rest"
  | "stream-pause"
  | "lamp-waiting"
  | "snow-shelter"
  | "new-leaf-start"
  | "open-sky-release";

export type HealingScenarioSelection = "auto" | HealingScenarioId;

export interface HealingScenarioProfile {
  id: HealingScenarioId;
  label: string;
  labelEn: string;
  cue: string;
  cueEn: string;
  emotions: readonly string[];
  times: readonly string[];
  weather: readonly string[];
  spaces: readonly string[];
  imagery: readonly string[];
  sounds: readonly string[];
}

export const HEALING_SCENARIOS: readonly HealingScenarioProfile[] = [
  {
    id: "rain-return",
    label: "雨后归来",
    labelEn: "return after rain",
    cue: "让脚步慢下来，回到一个不必解释自己的地方",
    cueEn: "slow your steps and return to a place where nothing needs to be explained",
    emotions: ["归来", "安定", "释然"],
    times: ["雨停后的傍晚", "天色刚刚放晴的时候"],
    weather: ["雨后初晴", "湿润的微风"],
    spaces: ["山路尽头的小屋", "屋檐下的石阶", "刚被雨洗过的村口"],
    imagery: ["湿石阶", "半开的木门", "一盏暖灯"],
    sounds: ["檐角滴水", "远处很轻的水声"]
  },
  {
    id: "window-breath",
    label: "窗边慢呼吸",
    labelEn: "slow breathing by the window",
    cue: "不急着抵达，只让一束光陪你把呼吸放慢",
    cueEn: "do not rush to arrive; let one beam of light slow your breathing",
    emotions: ["安定", "独处", "温暖"],
    times: ["清晨第一束光落下时", "午后光线变柔的时候"],
    weather: ["晴朗而安静", "窗外有很轻的风"],
    spaces: ["临山的白墙小屋", "一间朝向树影的房间", "窗边的安静院落"],
    imagery: ["明亮窗台", "白墙上的树影", "一杯尚有温度的水"],
    sounds: ["风穿过窗缝", "几乎听不见的鸟鸣"]
  },
  {
    id: "tree-shade-rest",
    label: "树荫停留",
    labelEn: "rest beneath the tree",
    cue: "在抵达之前停一会儿，允许自己什么也不完成",
    cueEn: "pause before arriving and allow yourself to finish nothing",
    emotions: ["清凉", "安定", "独处"],
    times: ["盛夏午后", "日光被树冠筛碎的时候"],
    weather: ["树荫下微凉", "晴日里的一阵清风"],
    spaces: ["古树下的山坡", "村口的一方树荫", "通往小屋的绿荫路"],
    imagery: ["巨大的季节树", "一块平整石头", "被光切开的草地"],
    sounds: ["树叶轻响", "远处蝉声渐远"]
  },
  {
    id: "stream-pause",
    label: "溪边停留",
    labelEn: "pause beside the stream",
    cue: "把心事交给流水，坐在不需要回答的片刻里",
    cueEn: "give the unsettled thought to the water and sit in a moment needing no answer",
    emotions: ["清凉", "释然", "安定"],
    times: ["傍晚水面刚接住天光时", "山谷里的光开始退潮时"],
    weather: ["清澈的薄雾", "雨后水声变亮"],
    spaces: ["溪流转弯处", "石桥旁的浅水边", "山谷里一小片开阔地"],
    imagery: ["明亮水面", "低矮石桥", "溪边一条小路"],
    sounds: ["近处流水", "石缝里的细小回声"]
  },
  {
    id: "lamp-waiting",
    label: "灯下守候",
    labelEn: "waiting beneath the lamp",
    cue: "保留一盏温暖的光，提醒你夜色里仍有回去的方向",
    cueEn: "keep one warm light to remember that the night still has a way home",
    emotions: ["守候", "温暖", "等待"],
    times: ["蓝色傍晚刚刚降临时", "夜色还没有完全合拢时"],
    weather: ["清冷而无风", "薄雾停在屋外"],
    spaces: ["山村屋檐下", "远离人群的小院", "一条通向灯火的窄路"],
    imagery: ["窗内暖灯", "深色屋檐", "门前未熄的光"],
    sounds: ["木门轻响", "夜里安静的风声"]
  },
  {
    id: "snow-shelter",
    label: "初雪庇护",
    labelEn: "shelter in the first snow",
    cue: "在安静的白色世界里，找到一处可以暂时放下疲惫的屋檐",
    cueEn: "find an eave in the quiet white world where weariness can rest for a while",
    emotions: ["温暖", "守候", "独处"],
    times: ["初雪后的清晨", "雪落得很轻的黄昏"],
    weather: ["初雪无声", "冷空气里有清亮的光"],
    spaces: ["雪中的白墙小屋", "安静湖岸的一间屋子", "被雪围住的山村"],
    imagery: ["积雪屋檐", "深色木门", "屋内一小片暖光"],
    sounds: ["近乎无声", "远处很轻的风"]
  },
  {
    id: "new-leaf-start",
    label: "新叶开始",
    labelEn: "begin with a new leaf",
    cue: "不需要一次走很远，只从眼前这一小步重新开始",
    cueEn: "you do not need to go far; begin again with the small step before you",
    emotions: ["新生", "期待", "归来"],
    times: ["春日清晨", "第一片新叶刚打开的时候"],
    weather: ["新雨后的清亮空气", "温柔的春风"],
    spaces: ["新绿之间的小径", "村屋旁刚醒来的院子", "山坡上一处向阳空地"],
    imagery: ["新叶", "半开的门", "通向远处的细路"],
    sounds: ["细小水声", "一两声鸟鸣"]
  },
  {
    id: "open-sky-release",
    label: "天光放下",
    labelEn: "release beneath the open sky",
    cue: "把无法立刻解决的事留在远处，让视线先回到明亮的天空",
    cueEn: "leave what cannot be solved at a distance and return your gaze to the bright sky",
    emotions: ["释然", "清凉", "安定"],
    times: ["雨云散开的黄昏", "远山被光重新擦亮时"],
    weather: ["云隙透光", "高远而清澈"],
    spaces: ["山顶开阔处", "河岸尽头的草地", "一条通向远方的高地小路"],
    imagery: ["大面积明亮天空", "远处一棵树", "通向开阔处的路径"],
    sounds: ["风声变得辽阔", "远处水面轻响"]
  }
];
