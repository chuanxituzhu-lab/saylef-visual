const form = document.querySelector("#creator");
const result = document.querySelector("#result");
const empty = document.querySelector("#empty");
const status = document.querySelector("#status");
const submitButton = form.querySelector('button[type="submit"]');
const randomButton = document.querySelector("#randomize");
const copyButton = document.querySelector("#copy-prompt");
const copyStatus = document.querySelector("#copy-status");
const proFields = document.querySelector("#pro-fields");
const domainCurrentBadge = document.querySelector("#domain-current-badge");
const domainDescription = document.querySelector("#domain-description");
const domainDirectoryList = document.querySelector("#domain-directory-list");
const modeButtons = [...document.querySelectorAll("[data-mode]")];
let currentPrompt = "";

const domainCatalog = {
  painting: {
    label: "绘画",
    description: "空间叙事、高纯度颜料与手工绘画质感。",
    categories: [
      { label: "创意核心", detail: "情绪 · 诗意 · 故事瞬间", target: "#field-creative-core" },
      { label: "绘画方向", detail: "色彩 · 画幅 · 光线", target: "#field-format" },
      { label: "绘画审美检查", detail: "Style Identity · Signature · Guard", target: "#field-guard" }
    ]
  },
  photography: {
    label: "摄影",
    description: "真实光线、镜头参数与摄影审美检查。",
    categories: [
      { label: "创意核心", detail: "情绪 · 诗意 · 故事瞬间", target: "#field-creative-core" },
      { label: "摄影方向", detail: "焦段 · 光圈 · ISO · 快门", target: "#pro-fields" },
      { label: "摄影审美检查", detail: "Photography Critic · AI Trace", target: "#field-guard" }
    ]
  }
};

const randomIdeas = [
  "雨停以后，山路尽头的一盏灯还在等人",
  "夏日下午，树荫下的水面刚刚接住第一束光",
  "雪后的门前，留下了一双还没有走远的脚印",
  "新叶之间，一条小路通向尚未说完的故事",
  "黄昏的河岸，有人把一封信放进风里"
];
const randomSeasons = ["spring", "summer", "autumn", "winter"];
const randomDomains = ["painting", "photography"];
const randomEmotions = ["等待", "思念", "归来", "归属", "安定", "温暖", "独处", "新生", "释然", "守候", "清凉"];
const randomHealingScenarios = ["rain-return", "window-breath", "tree-shade-rest", "stream-pause", "lamp-waiting", "snow-shelter", "new-leaf-start", "open-sky-release"];
const randomTimePoints = ["dawn", "morning", "midday", "afternoon", "golden-hour", "blue-hour", "night"];
const randomRatios = ["3:4", "4:5", "1:1", "9:16", "16:9"];

modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
form.elements.domain.addEventListener("change", syncAccountForDomain);
form.elements.domain.addEventListener("change", syncDomainDirectory);
form.elements.ratio.addEventListener("change", syncPreviewRatio);
randomButton.addEventListener("click", randomize);
copyButton.addEventListener("click", async () => {
  if (!currentPrompt) return;
  try { await copyText(currentPrompt); copyStatus.textContent = "已复制"; }
  catch { copyStatus.textContent = "复制失败"; }
  window.setTimeout(() => { copyStatus.textContent = ""; }, 1800);
});
form.addEventListener("submit", (event) => { event.preventDefault(); generateStory(); });
syncAccountForDomain();
syncDomainDirectory();
syncPreviewRatio();

function setMode(mode = "simple") {
  const selected = mode === "pro" ? "pro" : "simple";
  form.elements.mode.value = selected;
  proFields.hidden = selected !== "pro";
  modeButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === selected));
}

function syncAccountForDomain() {
  form.elements.accountId.value = form.elements.domain.value === "photography" ? "account-b" : "account-a";
}

function syncDomainDirectory() {
  const selectedDomain = domainCatalog[form.elements.domain.value] || domainCatalog.painting;
  domainCurrentBadge.textContent = selectedDomain.label;
  domainDescription.textContent = selectedDomain.description;
  domainDirectoryList.replaceChildren();

  selectedDomain.categories.forEach((category, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "directory-item";
    button.setAttribute("aria-label", `${category.label}：${category.detail}`);
    button.innerHTML = '<span class="directory-index">0' + (index + 1) + '</span><span class="directory-copy"><strong></strong><small></small></span><span class="directory-arrow">↘</span>';
    button.querySelector("strong").textContent = category.label;
    button.querySelector("small").textContent = category.detail;
    button.addEventListener("click", () => {
      if (category.target === "#pro-fields" && proFields.hidden) setMode("pro");
      const target = document.querySelector(category.target);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("directory-focus");
      window.setTimeout(() => target.classList.remove("directory-focus"), 900);
    });
    item.appendChild(button);
    domainDirectoryList.appendChild(item);
  });
}

function randomize() {
  form.elements.userIdea.value = pick(randomIdeas);
  form.elements.domain.value = pick(randomDomains);
  syncAccountForDomain();
  form.elements.season.value = pick(randomSeasons);
  form.elements.emotionHint.value = pick(randomEmotions);
  form.elements.healingScenario.value = pick(randomHealingScenarios);
  form.elements.timePoint.value = pick(randomTimePoints);
  form.elements.ratio.value = pick(randomRatios);
  setMode(Math.random() > .65 ? "pro" : "simple");
  syncPreviewRatio();
  generateStory();
}

async function generateStory() {
  setBusy(true);
  status.textContent = "导演编译中…";
  currentPrompt = "";
  copyButton.disabled = true;
  copyStatus.textContent = "";
  const data = Object.fromEntries(new FormData(form));
  if (data.season === "auto") delete data.season;
  if (data.healingScenario === "auto") delete data.healingScenario;
  if (data.timePoint === "auto") delete data.timePoint;
  if (!data.userIdea) delete data.userIdea;
  if (!data.emotionHint) delete data.emotionHint;
  if (data.mode === "pro" && data.domain === "photography") {
    data.camera = { focalLength: data.focalLength, aperture: data.aperture, iso: data.iso, shutter: data.shutter };
  }
  delete data.focalLength; delete data.aperture; delete data.iso; delete data.shutter;
  try {
    const response = await fetch("/api/create", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "生成失败");
    renderResult(payload);
  } catch (error) {
    status.textContent = error.message;
  } finally { setBusy(false); }
}

function renderResult(payload) {
  const intent = payload.intent;
  const intelligence = payload.intelligence;
  document.querySelector("#title").textContent = intent.narrative.title;
  document.querySelector("#hook").textContent = intent.narrative.hook;
  document.querySelector("#domain-badge").textContent = intent.domain === "photography" ? "Photography" : "Painting";
  document.querySelector("#healing-scenario").textContent = `${intent.healing.label} · ${intent.healing.cue}`;
  document.querySelector("#time-point").textContent = `${intent.time.label} · ${intent.time.clock}`;
  document.querySelector("#emotion").textContent = intent.narrative.emotion;
  document.querySelector("#moment").textContent = intent.narrative.moment;
  document.querySelector("#hero").textContent = intent.scene.hero;
  document.querySelector("#entrance").textContent = intent.scene.entrance;
  document.querySelector("#account").textContent = `${payload.accountDNA.label} · ${payload.accountDNA.styleVersion}`;
  document.querySelector("#palette").innerHTML = [intent.color.base, intent.color.primary, intent.color.structure, intent.color.accent].map((value) => `<span class="chip">${escapeHtml(value)}</span>`).join("");
  document.querySelector("#intelligence-score").textContent = `${intelligence.score} / 100`;
  const decision = document.querySelector("#intelligence-decision");
  decision.textContent = intelligence.decision === "accept" ? "QUALITY GATE · PASS" : `QUALITY GATE · ${intelligence.decision.toUpperCase()}`;
  decision.className = `decision ${intelligence.decision}`;
  document.querySelector("#gate").innerHTML = gateMarkup(intelligence.qualityGate);
  document.querySelector("#critic-dimensions").innerHTML = Object.entries(intelligence.domainCritic.dimensions).map(([key, value]) => `<span><b>${escapeHtml(intelligence.domainCritic.labels[key] || key)}</b>${value}</span>`).join("");
  document.querySelector("#ai-trace").textContent = `${intelligence.aiTrace.severity} · ${intelligence.aiTrace.score}/${intelligence.aiTrace.threshold} · ${intelligence.aiTrace.signals.length ? intelligence.aiTrace.signals.join(", ") : "未发现结构性 AI 痕迹信号"}`;
  currentPrompt = payload.prompt.prompt;
  document.querySelector("#prompt").textContent = currentPrompt;
  copyButton.disabled = false;
  document.querySelector("#job").textContent = JSON.stringify(payload.hostJob || payload, null, 2);
  renderReservedFrame(payload);
  empty.hidden = true; result.hidden = false;
  status.textContent = payload.guard.passed ? `Guard ${payload.guard.score}/100 · ${intelligence.decision}` : `Guard ${payload.guard.score}/100 · 需要重试`;
}

function gateMarkup(gate) {
  return Object.entries({ technical: "Technical QA", aiTrace: "AI Trace", artistic: "Domain Critic", styleIdentity: "Style Identity", signature: "Signature" }).map(([key, label]) => `<span class="gate ${gate[key] ? "pass" : "fail"}"><i></i>${label}</span>`).join("");
}

function renderReservedFrame(payload) {
  const frame = payload.hostJob && payload.hostJob.reservedFrame;
  const card = document.querySelector("#frame-card");
  if (!frame) { card.hidden = true; return; }
  const intent = payload.intent;
  const stage = document.querySelector("#frame-stage");
  stage.style.setProperty("--frame-primary", toCssColor(intent.color.primary, "#3f9a68"));
  stage.style.setProperty("--frame-accent", toCssColor(intent.color.accent, "#d84f3f"));
  stage.style.setProperty("--frame-structure", toCssColor(intent.color.structure, "#1e2922"));
  stage.style.aspectRatio = intent.format.ratio.replace(":", " / ");
  document.querySelector("#frame-title").textContent = frame.label;
  document.querySelector("#frame-status").textContent = "已预留 · 等待 Host 执行";
  document.querySelector("#frame-art-title").textContent = intent.narrative.title;
  document.querySelector("#frame-art-moment").textContent = intent.narrative.moment;
  document.querySelector("#frame-note").textContent = "这是构图预留画面，不代表图像已生成。只有获得真实 artifact 后，Host 才能替换此预留。";
  card.hidden = false;
}

function syncPreviewRatio() { document.querySelector("#empty").style.aspectRatio = (form.elements.ratio.value || "3:4").replace(":", " / "); }
function setBusy(busy) { submitButton.disabled = busy; randomButton.disabled = busy; }
function pick(values) { return values[Math.floor(Math.random() * values.length)]; }
function toCssColor(value, fallback) { const text = String(value).toLowerCase(); if (text.includes("ivory") || text.includes("snow")) return "#fffdf3"; if (text.includes("green")) return "#3f9a68"; if (text.includes("blue") || text.includes("cobalt")) return "#3d6fc4"; if (text.includes("red") || text.includes("vermilion")) return "#d84f3f"; if (text.includes("yellow") || text.includes("golden")) return "#d6a62d"; if (text.includes("charcoal") || text.includes("shadow")) return "#1e2922"; return fallback; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[character])); }
async function copyText(text) { if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text); const helper = document.createElement("textarea"); helper.value = text; helper.setAttribute("readonly", ""); helper.style.position = "fixed"; helper.style.opacity = "0"; document.body.appendChild(helper); helper.select(); if (!document.execCommand("copy")) throw new Error("copy_failed"); helper.remove(); }
