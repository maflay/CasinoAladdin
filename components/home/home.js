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

      const version = Date.now();

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = `/components/promociones/promocion-view/promocion-view.css?v=${version}`;
      document.head.appendChild(estilo);
      const script = document.createElement("script");
      script.src = `/components/promociones/promocion-view/promocion-view.js?v=${version}`;
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
        <p>Cargando Contenido ...</p>
      </div>
    `;
  // --- fetch posts desde Apps Script ---
  fetch(IG_FETCH_URL)
    .then((res) => res.json())
    .then((data) => {
      // si data ya es un array [{url:"..."}, ...]
      const posts = data
        .reverse()
        .slice(0, 4)
        .map((item) => normalizeIgUrl(item.url));

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

(() => {
  if (document.getElementById("juegos-view-seccion")) {
    fetch("/components/juegos/juegos-view/juegos-view.html")
      .then((res) => res.text())
      .then((html) => {
        const contenedor = document.getElementById("juegos-view-seccion");
        contenedor.innerHTML = html;

        // Cargar CSS dinámicamente
        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href = "/components/juegos/juegos-view/juegos-view.css";
        document.head.appendChild(estilo);

        // Cargar script dinámicamente
        const script = document.createElement("script");
        script.src = "/components/juegos/juegos-view/juegos-view.js";
        script.onload = () => {
          if (typeof window.inicializarSliderUbicaciones === "function") {
            window.inicializarSliderUbicaciones();
          }
        };
        document.body.appendChild(script);
      });
  }
})();

itemnavidad();

function itemnavidad() {
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    month: "long",
  });

  const fechaAño = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  document.getElementById("año_diciembre").textContent = fechaAño;

  if (fechaCompleta == "diciembre") {
    document.getElementById("navidad_home").style.display = "flex";
  }
}

seccionUbicaciones();

function seccionUbicaciones() {
  const hash = window.location.hash;

  if (hash.includes("id=ubicaciones")) {
    irASeccionCoordenadas();
    setTimeout(() => {
      irASeccionCoordenadas();
    }, 1000);
    setTimeout(() => {
      const hash = window.location.hash.slice(1);
      const [ruta, query] = hash.split("?");

      if (!query) return;

      const params = new URLSearchParams(query);
      if (params.get("id") === "ubicaciones") {
        history.replaceState(null, "", `#${ruta}`);
      }
    }, 2000);
  }

  function irASeccionCoordenadas() {
    const destino = document.getElementById("ubicaciones");

    if (destino) {
      const posicionY =
        destino.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: posicionY,
        behavior: "smooth",
      });
    }
  }
}

seccionMembresia();

function seccionMembresia() {
  const hash = window.location.hash;

  if (hash.includes("id=membresia-home")) {
    irASeccionCoordenadas();
    setTimeout(() => {
      irASeccionCoordenadas();
    }, 1000);
    setTimeout(() => {
      const hash = window.location.hash.slice(1);
      const [ruta, query] = hash.split("?");

      if (!query) return;

      const params = new URLSearchParams(query);
      if (params.get("id") === "membresia-home") {
        history.replaceState(null, "", `#${ruta}`);
      }
    }, 2000);
  }

  function irASeccionCoordenadas() {
    const destino = document.getElementById("membresia-home");

    if (destino) {
      const posicionY =
        destino.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: posicionY,
        behavior: "smooth",
      });
    }
  }
}

