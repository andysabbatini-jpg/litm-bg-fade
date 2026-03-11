// LITM Background Fade Module - V3

Hooks.on("renderMistEngineLegendInTheMistCharacterSheet", (app, html) => {
  // In V13 html è un elemento DOM nativo, non jQuery
  const form = html instanceof HTMLElement ? html : html[0];
  if (!form) return;

  // Il window-content è il parentElement del form
  const windowContent = form.closest(".window-content") 
    || form.parentElement?.closest(".window-content")
    || form.parentElement;

  if (!windowContent) return;
  if (windowContent.querySelector(".litm-bg-layer")) return;

  const bgUrl = windowContent.style.backgroundImage;
  if (!bgUrl || bgUrl === "none" || bgUrl === "") return;

  windowContent.style.removeProperty("background-image");
  windowContent.style.position = "relative";

  const bg = document.createElement("div");
  bg.className = "litm-bg-layer";
  bg.style.position = "absolute";
  bg.style.inset = "0";
  bg.style.backgroundImage = bgUrl;
  bg.style.backgroundSize = "cover";
  bg.style.backgroundPosition = "center";
  bg.style.backgroundRepeat = "no-repeat";
  bg.style.pointerEvents = "none";
  bg.style.zIndex = "0";
  bg.style.webkitMaskImage = "linear-gradient(to right, black 65%, transparent 95%)";
  bg.style.maskImage = "linear-gradient(to right, black 65%, transparent 95%)";
  windowContent.insertBefore(bg, windowContent.firstChild);
});
