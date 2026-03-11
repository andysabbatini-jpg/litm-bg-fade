// LITM Background Fade Module - V2

function applyBgFade() {
  const windowContent = document.querySelector(".window-content[style*='background-image']");
  if (!windowContent) return;
  if (windowContent.querySelector(".litm-bg-layer")) return;

  const bgUrl = windowContent.style.backgroundImage;
  if (!bgUrl || bgUrl === "none") return;

  windowContent.style.removeProperty('background-image');
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
}

// Esegui ad ogni render di qualsiasi Application
Hooks.on("renderApplication", () => applyBgFade());

// Anche dopo un breve delay per sicurezza
Hooks.on("renderApplication", () => setTimeout(applyBgFade, 200));
