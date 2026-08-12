const form = document.querySelector("#creator");
const result = document.querySelector("#result");
const empty = document.querySelector("#empty");
const status = document.querySelector("#status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "编译中…";
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
    const n = payload.intent.narrative;
    document.querySelector("#title").textContent = n.title;
    document.querySelector("#hook").textContent = n.hook;
    document.querySelector("#emotion").textContent = n.emotion;
    document.querySelector("#moment").textContent = n.moment;
    document.querySelector("#hero").textContent = payload.intent.scene.hero;
    document.querySelector("#entrance").textContent = payload.intent.scene.entrance;
    const c = payload.intent.color;
    document.querySelector("#palette").innerHTML = [c.base,c.primary,c.structure,c.accent].map(x => `<span class="chip">${escapeHtml(x)}</span>`).join("");
    document.querySelector("#prompt").textContent = payload.prompt.prompt;
    document.querySelector("#job").textContent = JSON.stringify(payload.hostJob || payload, null, 2);
    empty.hidden = true;
    result.hidden = false;
    status.textContent = payload.guard.passed ? `Guard ${payload.guard.score}/100 · 可执行` : `Guard ${payload.guard.score}/100 · 需重试`;
  } catch (error) {
    status.textContent = error.message;
  }
});

function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));}
