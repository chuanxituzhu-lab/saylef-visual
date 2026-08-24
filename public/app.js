const form = document.querySelector('#creator');
const status = document.querySelector('#status');
const story = document.querySelector('#story');
const plan = document.querySelector('#plan');
const promptCard = document.querySelector('#prompt-card');
const prompt = document.querySelector('#prompt');
const copyButton = document.querySelector('#copy-prompt');
const languageInput = form.elements.language;
let hasGenerated = false;

const copy = {
  zh: { title: '给一个感觉，生成一个安静的故事画面。', lede: '固定视觉 DNA，变化诗意、季节与故事瞬间。当前版本输出可交给宿主图片工具执行的任务计划。', idea: '创作想法', season: '季节', ratio: '尺寸', emotion: '情绪', generate: '生成视觉意图', result: '结果', placeholder: '画面预览占位', prompt: '生成提示词', copy: '复制提示词', copied: '已复制', waiting: '等待输入', generating: '生成中', auto: '自动', spring: '春', summer: '夏', autumn: '秋', winter: '冬', emotionAuto: '随季节自动', quietJoy: '安静的喜悦', quietLonging: '安静的思念', quietBelonging: '安静的归属感', quietWaiting: '安静的等待', quietSolitude: '安静的独处', quietTenderness: '安静的温柔', quietAnticipation: '安静的期待', quietCourage: '安静的勇气', quietReunion: '安静的重逢', quietFarewell: '安静的告别', warmGuardianship: '温暖的守候', healingSerenity: '治愈的宁静', plan: '宿主调用计划', passed: '校验通过', regenerate: '需要重新生成', moment: '画面瞬间', hook: '视觉钩子', question: '未完的问题', failed: '生成失败' },
  en: { title: 'Give it a feeling. Receive a quiet visual story.', lede: 'Keep the visual DNA fixed while poetry, seasons, and story moments change. The result is ready for a host image tool.', idea: 'Creative idea', season: 'Season', ratio: 'Aspect ratio', emotion: 'Emotion', generate: 'Generate Visual Intent', result: 'Result', placeholder: 'Visual preview placeholder', prompt: 'Generation prompt', copy: 'Copy prompt', copied: 'Copied', waiting: 'Waiting', generating: 'Generating', auto: 'Auto', spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter', emotionAuto: 'Auto by season', quietJoy: 'Quiet joy', quietLonging: 'Quiet longing', quietBelonging: 'Quiet belonging', quietWaiting: 'Quiet waiting', quietSolitude: 'Quiet solitude', quietTenderness: 'Quiet tenderness', quietAnticipation: 'Quiet anticipation', quietCourage: 'Quiet courage', quietReunion: 'Quiet reunion', quietFarewell: 'Quiet farewell', warmGuardianship: 'Warm guardianship', healingSerenity: 'Healing serenity', plan: 'Host Invocation Plan', passed: 'Guard passed', regenerate: 'Regeneration required', moment: 'Story moment', hook: 'Visual hook', question: 'Open question', failed: 'Generation failed' }
};

const setLanguage = (language) => {
  languageInput.value = language;
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = copy[language][node.dataset.i18n]; });
  document.querySelectorAll('.lang').forEach((button) => button.classList.toggle('active', button.dataset.language === language));
  form.elements.user_idea.value = language === 'en' ? 'Autumn, a quiet story about waiting' : '秋天，一个关于等待的安静故事';
  status.textContent = copy[language].waiting;
};

setLanguage('zh');

document.querySelectorAll('.lang').forEach((button) => button.addEventListener('click', () => {
  const shouldRegenerate = hasGenerated;
  setLanguage(button.dataset.language);
  if (shouldRegenerate) form.requestSubmit();
}));

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(prompt.textContent);
  copyButton.textContent = copy[languageInput.value].copied;
  setTimeout(() => { copyButton.textContent = copy[languageInput.value].copy; }, 1400);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = copy[languageInput.value].generating;
  const input = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch('/api/create', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || copy[languageInput.value].failed);
    const labels = copy[languageInput.value];
    status.textContent = result.guard.passed ? labels.passed : labels.regenerate;
    story.innerHTML = `<h2>${result.story.title}</h2><p>${result.story.micro_story}</p><p><strong>${labels.moment}：</strong>${result.story.story_moment}</p><p><strong>${labels.hook}：</strong>${result.story.visual_hook}</p><p><strong>${labels.question}：</strong>${result.story.unresolved_question}</p>`;
    plan.textContent = JSON.stringify(result.host_invocation_plan, null, 2);
    const promptData = result.host_invocation_plan.prompt;
    prompt.textContent = `${promptData.prompt}\n\n${languageInput.value === 'en' ? 'Negative prompt' : '负向提示词'}：${promptData.negative_prompt}`;
    promptCard.hidden = false;
    hasGenerated = true;
  } catch (error) {
    status.textContent = error.message;
    story.textContent = '';
    plan.textContent = '';
    prompt.textContent = '';
    promptCard.hidden = true;
  }
});
