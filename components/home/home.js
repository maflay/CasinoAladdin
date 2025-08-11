// (() => {
//   fetch("/components/slider-juegos/slider-juegos.html")
//     .then((res) => res.text())
//     .then((html) => {
//       const contenedor = document.getElementById("section-start-slider-juegos");
//       contenedor.innerHTML = html;

//       const estilo = document.createElement("link");
//       estilo.rel = "stylesheet";
//       estilo.href = "/components/slider-juegos/slider-juegos.css";
//       document.head.appendChild(estilo);
//       // Cargar script dinámicamente
//       const script = document.createElement("script");
//       script.src = "/components/slider-juegos/slider-juegos.js";
//       script.onload = () => {
//         if (typeof window.inicializarSliderUbicaciones === "function") {
//           window.inicializarSliderUbicaciones();
//         }
//       };
//       document.body.appendChild(script);
//     });
// })();

(() => {
  fetch("/components/promociones/promocion-view/promocion-view.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("promocion-seccion");
      contenedor.innerHTML = html;

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = "/components/promociones/promocion-view/promocion-view.css";
      document.head.appendChild(estilo);
      const script = document.createElement("script");
      script.src = "/components/promociones/promocion-view/promocion-view.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();

function toPromociones() {
  navegarA("promociones");
}

window.IG_POSTS ??= [
  "https://www.instagram.com/p/DNG4ZXkS0a3/?img_index=1",
  "https://www.instagram.com/p/DM8NJuqM59x/",
  "https://www.instagram.com/p/DM3DlWOs7qU/",
  "https://www.instagram.com/p/DMv39TTS_PY/",
];

function ensureInstagramScript() {
  if (
    !document.querySelector('script[src^="https://www.instagram.com/embed.js"]')
  ) {
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.head.appendChild(s);
  }
}

window.VALID_POST =
  /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9_-]+\/$/;

function normalizeIgUrl(url) {
  if (!url) return "";
  let u = url.trim().split("?")[0];
  if (!u.endsWith("/")) u += "/";
  return u;
}

function renderInstagramEmbeds(containerId = "ig-feed", posts = []) {
  ensureInstagramScript();
  const loaderLocal = document.getElementById("loader-local");

  loaderLocal.innerHTML = `
    <div class="loader-local">
      <div class="spinner"></div>
      <p>Cargando multimedia ...</p>
    </div>
  `;

  const container = document.getElementById(containerId);
  if (!container) return;

  const normalized = posts.map(normalizeIgUrl);
  const valid = normalized.filter((u) => VALID_POST.test(u));
  const invalid = normalized.filter((u) => !VALID_POST.test(u));

  if (invalid.length) {
    console.warn(
      "URLs IG omitidas (no son permalinks de post/reel/tv):",
      invalid
    );
  }

  container.innerHTML = valid
    .map(
      (url) => `
        <blockquote class="instagram-media"
          data-instgrm-permalink="${url}"
          data-instgrm-version="14"
          style="background:#fff;border:0;margin:0 auto;max-width:540px;width:100%;">
        </blockquote>
      `
    )
    .join("");

  const tryProcess = () => {
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();

      const checkLoaded = setInterval(() => {
        const iframes = container.querySelectorAll("iframe");
        if (iframes.length > 0) {
          clearInterval(checkLoaded);
          loaderLocal.innerHTML = ``;

          // 🔧 Aplicar border-radius a cada iframe
          iframes.forEach((iframe) => {
            iframe.style.borderRadius = "8px";
            iframe.style.overflow = "hidden"; // por seguridad visual
          });
        }
      }, 300);
    } else {
      setTimeout(tryProcess, 150);
    }
  };

  tryProcess();
}

renderInstagramEmbeds("ig-feed", IG_POSTS);
