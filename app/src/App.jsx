import { useEffect } from "react";
import legacyMarkup from "../legacy-body.html?raw";

const scriptPromises = new Map();

function loadClassicScript(src) {
  if (scriptPromises.has(src)) return scriptPromises.get(src);

  const existingScript = document.querySelector(`script[data-legacy-src="${src}"]`);
  if (existingScript?.dataset.loaded === "true") {
    const loadedPromise = Promise.resolve();
    scriptPromises.set(src, loadedPromise);
    return loadedPromise;
  }

  const promise = new Promise((resolve, reject) => {
    const script = existingScript || document.createElement("script");

    script.src = src;
    script.defer = true;
    script.dataset.legacySrc = src;

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );

    script.addEventListener(
      "error",
      () => {
        reject(new Error(`Falha ao carregar script legado: ${src}`));
      },
      { once: true }
    );

    if (!existingScript) document.body.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

export default function App() {
  useEffect(() => {
    let active = true;

    async function bootstrapLegacyApp() {
      if (window.__lavaprimeLegacyBootstrapped) return;

      await loadClassicScript("/assets/data/fipe-veiculos.js");
      if (!active) return;

      await import("../main.js");
      window.__lavaprimeLegacyBootstrapped = true;
    }

    bootstrapLegacyApp().catch((error) => {
      console.error("Nao foi possivel inicializar o app legado do LavaPrime.", error);
    });

    return () => {
      active = false;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />;
}
