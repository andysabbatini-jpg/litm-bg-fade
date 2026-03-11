// LITM Background Fade Module
function applyBgFade(app) {
  const windowContent = app.element?.querySelector(".window-content") 
    || document.querySelector(`#${app.id} .window-content`)
    || app.element;

  if (!windowContent) return;

  const bgImage = windowContent.style.backgroundImage;
  if (!bgImage || bgImage === "none" || bgImage === "") return;

  if (windowContent.querySelector(".litm-bg-layer")) return;

  const bgEl = document.createElement("div");
  bgEl.className = "litm-bg-layer";
  bgEl.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: ${bgImage};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 0;
    -webkit-mask-image: linear-gradient(to right, black 65%, transparent 95%);
    mask-image: linear-gradient(to right, black 65%, transparent 95%);
  `;

  windowContent.style.backgroundImage = "none";
  windowContent.style.position = "relative";
  windowContent.insertBefore(bgEl, windowContent.firstChild);
}

Hooks.on("renderApplication", (app, html) => {
  if (app.constructor.name === "MistEngineLegendInTheMistCharacterSheet") {
    applyBgFade(app);
  }
});

Hooks.on("renderMistEngineLegendInTheMistCharacterSheet", (app, html) => {
  applyBgFade(app);
});
