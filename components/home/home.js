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

(() => {
  const IG_FETCH_URL =
    "https://script.google.com/macros/s/AKfycbyUUfvNpSQI8bSOZTO9mJ5IvQyVk3jz_U3E6Zu84j--eb3rbsE5vT_f5q6Don_2sxUl7w/exec";

  window.IG_POSTS = [];
  const loaderLocal = document.getElementById("loader-local");

  loaderLocal.innerHTML = `
      <div class="loader-local">
        <div class="spinner"></div>
        <p>Cargando multimedia ...</p>
      </div>
    `;
  // --- fetch posts desde Apps Script ---
  fetch(IG_FETCH_URL)
    .then((res) => res.json())
    .then((data) => {
      // console.log("Respuesta Apps Script:", data);

      // si data ya es un array [{url:"..."}, ...]
      const posts = data
      .reverse()
        .slice(0 ,4) // 👈 copia para no mutar el array original
        .map((item) => normalizeIgUrl(item.url));

      // console.log("Posts normalizados:", posts);

      window.IG_POSTS = posts;
      renderInstagramEmbeds("ig-feed", window.IG_POSTS);
    })
    .catch((err) => console.error("Error cargando IG posts:", err));

  // --- helpers ---
  function ensureInstagramScript() {
    if (
      !document.querySelector(
        'script[src^="https://www.instagram.com/embed.js"]'
      )
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
    if (!url || typeof url !== "string") return "";
    let u = url.trim().split("?")[0];
    if (!u.endsWith("/")) u += "/";
    return u;
  }

  function renderInstagramEmbeds(containerId = "ig-feed", posts = []) {
    ensureInstagramScript();

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
            style="background:#fff;border:0;margin:0 auto;max-width:540px;width:100%;border-radius:8px;overflow:hidden;">
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
          }
        }, 300);
      } else {
        setTimeout(tryProcess, 150);
      }
    };

    tryProcess();
  }
})();
