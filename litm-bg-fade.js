// LITM Background Fade Module
// Sposta il background-image della scheda personaggio su un elemento figlio
// separato, così può essere sfumato con CSS senza influenzare il contenuto.

Hooks.on("renderMistEngineLegendInTheMistCharacterSheet", (app, html, data) => {
  const windowContent = html[0].closest(".window-content") || html.find(".window-content")[0];
  
  if (!windowContent) return;

  const bgImage = windowContent.style.backgroundImage;
  if (!bgImage || bgImage === "none" || bgImage === "") return;

  // Crea elemento figlio per lo sfondo
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

  // Rimuovi il background dall'elemento originale
  windowContent.style.backgroundImage = "none";
  windowContent.style.position = "relative";

  // Inserisci come primo figlio
  windowContent.insertBefore(bgEl, windowContent.firstChild);
});
