import { runVisualStoryAgent } from './engine.mjs';

const args = process.argv.slice(2);
const value = (name, fallback = '') => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] || fallback : fallback;
};

const result = runVisualStoryAgent({
  user_idea: value('--idea', '秋天，一个关于等待的安静故事'),
  season: value('--season', 'auto'),
  emotion_hint: value('--emotion', ''),
  ratio: value('--ratio', '3:4'),
  provider: value('--provider', 'codex-host'),
  seed: Number(value('--seed', '42'))
});

console.log(JSON.stringify(result, null, 2));
