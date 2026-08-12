import type { PoeticContext } from "./poetic-context.js";

export interface StoryContract {
  source: PoeticContext;
  title: string;
  emotion: string;
  microStory: string;
  storyMoment: string;
  visualHook: string;
  unresolvedQuestion?: string;
  rules: {
    oneEmotion: true;
    oneStory: true;
    oneMoment: true;
    oneHook: true;
    openEnding: true;
  };
}
