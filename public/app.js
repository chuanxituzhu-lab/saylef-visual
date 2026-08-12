const form = document.querySelector('#creator');
const status = document.querySelector('#status');
const story = document.querySelector('#story');
const plan = document.querySelector('#plan');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '生成中';
  const input = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch('/api/create', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || '生成失败');
    status.textContent = result.guard.passed ? 'Guard passed' : '需要重生成';
    story.innerHTML = `<h2>${result.story.title}</h2><p>${result.story.micro_story}</p><p><strong>画面瞬间：</strong>${result.story.story_moment}</p><p><strong>视觉钩子：</strong>${result.story.visual_hook}</p><p><strong>未完的问题：</strong>${result.story.unresolved_question}</p>`;
    plan.textContent = JSON.stringify(result.host_invocation_plan, null, 2);
  } catch (error) {
    status.textContent = error.message;
    story.textContent = '';
    plan.textContent = '';
  }
});
