import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STYLE_DNA,
  compileProviderPrompt,
  compileVisualIntent,
  createHostInvocationPlan,
  createPoeticContext,
  createStory,
  runVisualStoryAgent,
  validateVisualIntent
} from '../src/engine.mjs';

test('creates a complete default Visual Story job', () => {
  const job = runVisualStoryAgent({ season: 'autumn', seed: 7 });
  assert.equal(job.visual_intent.version, 'visual-intent/1.0');
  assert.equal(job.guard.passed, true);
  assert.equal(job.host_invocation_plan.status, 'ready');
});

test('same seed produces the same automatic season and story', () => {
  const a = runVisualStoryAgent({ season: 'auto', seed: 123 });
  const b = runVisualStoryAgent({ season: 'auto', seed: 123 });
  assert.deepEqual(a.story, b.story);
  assert.deepEqual(a.visual_intent, b.visual_intent);
});

test('all four seasons retain the locked Style DNA', () => {
  for (const season of ['spring', 'summer', 'autumn', 'winter']) {
    const job = runVisualStoryAgent({ season });
    assert.equal(job.visual_intent.style_dna, STYLE_DNA.version);
    assert.equal(job.visual_intent.composition.focal_points, 1);
  }
});

test('format is recomposed instead of treated as a crop-only setting', () => {
  const job = runVisualStoryAgent({ season: 'summer', ratio: '9:16' });
  assert.equal(job.visual_intent.format.ratio, '9:16');
  assert.equal(job.visual_intent.format.recompose, true);
  assert.equal(job.visual_intent.composition.recompose, true);
});

test('Guard rejects a noisy multi-focus intent', () => {
  const context = createPoeticContext({ season: 'spring' });
  const story = createStory(context);
  const intent = compileVisualIntent({ request: { ratio: '3:4' }, context, story });
  intent.composition.focal_points = 2;
  intent.composition.visual_noise = 'high';
  const result = validateVisualIntent(intent);
  assert.equal(result.passed, false);
  assert.deepEqual(result.issues, ['focal_points_must_equal_one', 'visual_noise_must_be_low']);
});

test('provider adapters compile the same intent without changing the core', () => {
  const job = runVisualStoryAgent({ season: 'winter' });
  for (const provider of ['openai', 'gemini', 'qwen']) {
    const prompt = compileProviderPrompt(job.visual_intent, provider);
    assert.equal(prompt.provider, provider);
    assert.match(prompt.prompt, /Visual Intent visual-intent\/1\.0/);
    assert.equal(prompt.reserved, true);
  }
});

test('host plan delegates image execution to the host', () => {
  const job = runVisualStoryAgent({ season: 'summer' });
  const plan = createHostInvocationPlan(job.visual_intent);
  assert.equal(plan.execution, 'host-managed');
  assert.equal(plan.image_tool_required, true);
  assert.equal(plan.prompt.provider, 'codex-host');
});
