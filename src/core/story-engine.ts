import type { PoeticContext } from "../contracts/poetic-context.js";
import type { StoryContract } from "../contracts/story.js";
import type { RandomSource } from "./random.js";

const titleByEmotion: Record<string, readonly string[]> = {
  等待: ["门还开着", "灯没有熄", "路的尽头"],
  思念: ["风经过以后", "远山之外", "有人曾来过"],
  归来: ["回来的路", "屋檐下", "门前的光"],
  归属: ["树荫下的家", "回到这里", "屋里有光"],
  安定: ["树荫很深", "午后无事", "一间安静的屋"],
  温暖: ["雪里的一盏灯", "有人等你", "门口的光"],
  独处: ["山里只有风", "一个人的下午", "湖边无声"],
  新生: ["春天从门前开始", "新叶", "第一束光"],
  释然: ["风把叶子带走", "雨停了", "路仍向前"]
};

export function buildStory(context: PoeticContext, rng: RandomSource): StoryContract {
  const titles = titleByEmotion[context.emotionSeed] || ["这一刻很安静", "路还在继续", "风从这里经过"];
  const heroImage = context.imagery[0] || "一扇门";
  const secondImage = context.imagery[1] || "一条路";
  const title = rng.pick(titles);

  return {
    source: context,
    title,
    emotion: context.emotionSeed,
    microStory: `${context.weather}。${context.space}里很安静，${heroImage}仍在那里，${secondImage}像是在等一个尚未出现的人。`,
    storyMoment: `${context.time}，光第一次落到${heroImage}上`,
    visualHook: `大面积安静空间中，唯一被强调的${heroImage}`,
    unresolvedQuestion: "下一刻会有人出现吗？",
    rules: {
      oneEmotion: true,
      oneStory: true,
      oneMoment: true,
      oneHook: true,
      openEnding: true
    }
  };
}
