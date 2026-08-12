import type { PoeticContext, PoeticContextInput, Season } from "../contracts/poetic-context.js";
import { resolveHealingScenario } from "./healing-scenarios.js";
import type { RandomSource } from "./random.js";

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
type ConcreteSeason = Exclude<Season, "auto">;

const seasonal = {
  spring: {
    times: ["清晨", "午后雨歇"], weather: ["新雨后", "晴朗微风"], spaces: ["山村", "溪边小院", "竹林边"],
    imagery: ["嫩叶", "湿石阶", "半开的门", "远处新绿"], sounds: ["细水声", "一两声鸟鸣"], emotions: ["新生", "等待", "归来"]
  },
  summer: {
    times: ["盛夏午后", "傍晚"], weather: ["晴朗", "阵雨初歇"], spaces: ["树荫小屋", "溪谷", "湖边"],
    imagery: ["巨大树荫", "明亮水面", "红门", "石径"], sounds: ["流水声", "远蝉声"], emotions: ["安定", "清凉", "归属"]
  },
  autumn: {
    times: ["斜阳时分", "雨后黄昏"], weather: ["雨后初晴", "高远晴空"], spaces: ["山坡旧屋", "银杏小径", "河岸"],
    imagery: ["金黄树叶", "湿石路", "朱红门", "远山"], sounds: ["风过树叶", "远水声"], emotions: ["思念", "等待", "释然"]
  },
  winter: {
    times: ["雪后清晨", "蓝调傍晚"], weather: ["初雪后", "晴冷"], spaces: ["雪中小屋", "静湖岸", "山村"],
    imagery: ["积雪", "深色屋瓦", "暖灯", "一串脚印"], sounds: ["近乎无声", "远处风声"], emotions: ["守候", "温暖", "独处"]
  }
} as const;

export function buildPoeticContext(input: PoeticContextInput, rng: RandomSource): PoeticContext {
  const season: ConcreteSeason = input.season === "auto" ? rng.pick(SEASONS) : input.season;
  const bank = seasonal[season];
  const healing = resolveHealingScenario(input.healingScenario, rng);
  const emotionSeed = input.emotionHint?.trim() || rng.pick(healing.emotions.length ? healing.emotions : bank.emotions);
  const userIdea = input.userIdea?.trim();

  return {
    season,
    time: rng.pick(healing.times.length ? healing.times : bank.times),
    weather: rng.pick(healing.weather.length ? healing.weather : bank.weather),
    space: userIdea || rng.pick(healing.spaces.length ? healing.spaces : bank.spaces),
    imagery: [rng.pick(healing.imagery), rng.pick(healing.imagery)].filter((v, i, a) => a.indexOf(v) === i),
    sound: rng.pick(healing.sounds.length ? healing.sounds : bank.sounds),
    emotionSeed,
    poeticMood: `${season} · ${emotionSeed} · ${userIdea || rng.pick(bank.spaces)} · 留白未尽`,
    healingScenario: healing.id,
    healingScenarioLabel: healing.label,
    healingScenarioLabelEn: healing.labelEn,
    healingCue: healing.cue,
    healingCueEn: healing.cueEn
  };
}
