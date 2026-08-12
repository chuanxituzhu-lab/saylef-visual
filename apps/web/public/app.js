const form = document.querySelector("#creator");
const result = document.querySelector("#result");
const empty = document.querySelector("#empty");
const status = document.querySelector("#status");
const submitButton = form.querySelector('button[type="submit"]');
const randomButton = document.querySelector("#randomize");
const ratioField = form.elements.ratio;
const copyButton = document.querySelector("#copy-prompt");
const copyStatus = document.querySelector("#copy-status");
let currentPrompt = "";

const randomIdeas = [
  "雨停以后，一盏灯在山路尽头等人",
  "夏日树荫下，水面刚刚接住第一束光",
  "雪后的门前，留下了一串还没有走远的脚印",
  "新叶之间，一条小路通向尚未说完的故事",
  "黄昏的河岸，有人把一封信放在风里"
];
const randomSeasons = ["spring", "summer", "autumn", "winter"];
const randomEmotions = ["等待", "思念", "归来", "归属", "安定", "温暖", "独处", "新生", "释然", "守候", "清凉"];
const randomRatios = ["3:4", "4:5", "1:1", "9:16", "16:9"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generateStory();
});

randomButton.addEventListener("click", () => {
  form.elements.userIdea.value = pick(randomIdeas);
  form.elements.season.value = pick(randomSeasons);
  form.elements.emotionHint.value = pick(randomEmotions);
  form.elements.ratio.value = pick(randomRatios);
  syncPreviewRatio();
  form.elements.provider.value = "openai";
  form.elements.executionMode.value = "host";
  generateStory();
});

ratioField.addEventListener("change", syncPreviewRatio);
syncPreviewRatio();

copyButton.addEventListener("click", async () => {
  if (!currentPrompt) return;
  try {
    await copyText(currentPrompt);
    copyStatus.textContent = "已复制";
  } catch {
    copyStatus.textContent = "复制未成功";
  }
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
});

async function generateStory() {
  setBusy(true);
  syncPreviewRatio();
  status.textContent = "编译中…";
  currentPrompt = "";
  copyButton.disabled = true;
  copyStatus.textContent = "";
  const data = Object.fromEntries(new FormData(form));
  if (data.season === "auto") delete data.season;
  if (!data.userIdea) delete data.userIdea;
  if (!data.emotionHint) delete data.emotionHint;

  try {
    const response = await fetch("/api/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "生成失败");
    renderResult(payload);
  } catch (error) {
    status.textContent = error.message;
  } finally {
    setBusy(false);
  }
}

function renderResult(payload) {
  const n = payload.intent.narrative;
  document.querySelector("#title").textContent = n.title;
  document.querySelector("#hook").textContent = n.hook;
  document.querySelector("#emotion").textContent = n.emotion;
  document.querySelector("#moment").textContent = n.moment;
  document.querySelector("#hero").textContent = payload.intent.scene.hero;
  document.querySelector("#entrance").textContent = payload.intent.scene.entrance;

  const c = payload.intent.color;
  document.querySelector("#palette").innerHTML = [c.base, c.primary, c.structure, c.accent]
    .map((value) => "<span class=\"chip\">" + escapeHtml(value) + "</span>")
    .join("");
  currentPrompt = payload.prompt.prompt;
  document.querySelector("#prompt").textContent = currentPrompt;
  copyButton.disabled = false;
  document.querySelector("#job").textContent = JSON.stringify(payload.hostJob || payload, null, 2);
  renderReservedFrame(payload);

  empty.hidden = true;
  result.hidden = false;
  status.textContent = payload.guard.passed
    ? "Guard " + payload.guard.score + "/100 · 可执行"
    : "Guard " + payload.guard.score + "/100 · 需重试";
}

function renderReservedFrame(payload) {
  const frame = payload.hostJob && payload.hostJob.reservedFrame;
  const card = document.querySelector("#frame-card");
  if (!frame) {
    card.hidden = true;
    return;
  }

  const intent = payload.intent;
  const colors = intent.color;
  const stage = document.querySelector("#frame-stage");
  stage.style.setProperty("--frame-primary", toCssColor(colors.primary, "#3f9a68"));
  stage.style.setProperty("--frame-accent", toCssColor(colors.accent, "#d84f3f"));
  stage.style.setProperty("--frame-structure", toCssColor(colors.structure, "#1e2922"));
  stage.style.aspectRatio = intent.format.ratio.replace(":", " / ");
  document.querySelector("#frame-title").textContent = frame.label;
  document.querySelector("#frame-status").textContent = "已预留 · 待 Codex 生图";
  document.querySelector("#frame-art-title").textContent = intent.narrative.title;
  document.querySelector("#frame-art-moment").textContent = intent.narrative.moment;
  document.querySelector("#frame-note").textContent = "这是自动准备的构图预留画面，不代表图像已经生成。Codex 将使用 Host Invocation Plan 调用可用的 OpenAI 图像工具，并在获得 artifact 后替换此预留画面。";
  card.hidden = false;
}

function syncPreviewRatio() {
  const ratio = ratioField.value || "3:4";
  const cssRatio = ratio.replace(":", " / ");
  empty.style.aspectRatio = cssRatio;
  document.querySelector("#frame-stage").style.aspectRatio = cssRatio;
}

function setBusy(busy) {
  submitButton.disabled = busy;
  randomButton.disabled = busy;
}

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand("copy");
  helper.remove();
  if (!copied) throw new Error("copy_failed");
}

function pick(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function toCssColor(value, fallback) {
  const text = String(value).toLowerCase();
  if (text.includes("ivory") || text.includes("snow")) return "#fffdf3";
  if (text.includes("emerald") || text.includes("green")) return "#3f9a68";
  if (text.includes("blue") || text.includes("cobalt")) return "#3d6fc4";
  if (text.includes("red") || text.includes("vermilion")) return "#d84f3f";
  if (text.includes("yellow") || text.includes("golden")) return "#d6a62d";
  if (text.includes("charcoal")) return "#1e2922";
  return fallback;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
  }[character]));
}
