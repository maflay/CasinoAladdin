function toTest() {
  window.open("https://tomaelcontrol.coljuegos.gov.co/formulario/", "_blank");
}

function downForm() {
  window.open("/document/FORMULARIO-PERSONAL-DE-AUTOEXCLUSION.pdf", "_blank");
}
(() => {
  const btntoControl = document.getElementById("toma-control");

  btntoControl.addEventListener("click", () => {
    window.open("https://tomaelcontrol.coljuegos.gov.co/", "_blank");
  });
})();

function toDowgame() {
  window.open(
    "/document/programa_juego_responsable_aladdin_hotel__casino_sas.pdf",
    "_blank"
  );
}

(() => {
  const divElem = document.querySelector(".content_item>div");
  const mensaje_end_ = document.getElementById("mensaje_end_");
  const barra = document.getElementById("test_barra_inclinada");

  function pruebaAnimacion() {
    divElem.style.animationName = "move-right";
    // divElem.style.animationDuration = "3s";
    divElem.style.animationTimingFunction = "linear";
    divElem.style.animationFillMode = "forwards";

    setTimeout(() => {
      divElem.style.animationName = "move-top";
      // divElem.style.animationDuration = "3s";
      divElem.style.animationTimingFunction = "linear";
      divElem.style.animationFillMode = "forwards";
    }, 3000);

    setTimeout(() => {
      divElem.classList.add("last_posicion");
      divElem.style.animationName = "desaparecer";
    }, 6000);

    setTimeout(() => {
      divElem.style.display = "none";
      divElem.style.animationName = "unset";
      mensaje_end_.style.animation = "modelview 1.5s ease forwards";
    }, 9000);
  }

  function barranimated() {
    barra.classList.remove("animar-inclinacion");
    void barra.offsetWidth; // reflow para reiniciar animación
    barra.classList.add("animar-inclinacion");
  }

  (() => {
    const IG_FETCH_URL =
      "https://script.google.com/macros/s/AKfycby9VPX45GyEQuksn76jNGj0ejwFNFzd2oH-tf5iGPkcNCh6foW4_i9QXCxl2JoYcLY/exec";

    window.IG_POSTS = [];
    const loaderLocal = document.getElementById("loader_local");

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

        // si data ya es un array [{url:"..."}, ...]
        const posts = data
          .slice(0, 4) // 👈 copia para no mutar el array original
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

  // barranimated();

  // 🔹 Observar cuando el elemento entra al viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 👇 Detecta cuál elemento entró en pantalla
          if (entry.target.classList.contains("content_item")) {
            pruebaAnimacion(); // ▶️ inicia tu animación principal
          }

          if (entry.target.id === "content_logo_info") {
            barranimated(); // ⚙️ ejecuta tu otra animación
          }

          // Si quieres que se ejecute solo una vez por elemento:
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // activa cuando el 50% del elemento es visible
    }
  );

  // 🔹 Iniciar observación
  const contentItem = document.querySelector(".content_item");
  if (contentItem) observer.observe(contentItem);

  const content_logo_info = document.getElementById("content_logo_info");
  if (content_logo_info) observer.observe(content_logo_info);
  // (()=> {

  //   const selectElem = document.querySelector("select");
  //   const startBtn = document.querySelector("button");
  //   const divElem = document.querySelector(".content_item>div");
  //   const barra = document.getElementById("test_barra_inclinada");

  //   function pruebaAnimacion() {
  //     barra.classList.remove("animar-inclinacion");
  //     void barra.offsetWidth; // reflow para reiniciar animación
  //     barra.classList.add("animar-inclinacion");
  //   }

  //   setTimeout(() => {
  //     pruebaAnimacion();
  //   }, 120);
  // })();
})();

function conteoView() {
  const fechaCompletaC = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [fechaC, horaC] = fechaCompletaC.split(", ");
  const conteoJRCookie = getCookie("Conteo");
  if (!conteoJRCookie) {
    const url =
      "https://script.google.com/macros/s/AKfycbyyG9kTYdce-jABeF_Uz254A54HSy9fOJI0_IoEnuml3f5O91tT7mnA5E8EGWiR4p7PWA/exec";
    setCookie("Conteo", "conteo");
    let data = {
      tipo: "conteo",
      conteo: 1,
      hora: horaC,
      fecha: fechaC,
    };
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {});
  }
}

conteoView();
