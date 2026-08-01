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

(() => {
  if (document.getElementById("juegos-view-seccion")) {
    fetch("/components/juegos/juegos-view/juegos-view.html")
      .then((res) => res.text())
      .then((html) => {
        const contenedor = document.getElementById("juegos-view-seccion");
        contenedor.innerHTML = html;

        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href = "/components/juegos/juegos-view/juegos-view.css";
        document.head.appendChild(estilo);

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

(() => {
  if (document.getElementById("slider_promos")) {
    fetch("/components/promociones/promocion-slider/promocion-slider.html")
      .then((res) => res.text())
      .then((html) => {
        const contenedor = document.getElementById("slider_promos");
        contenedor.innerHTML = html;

        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href =
          "/components/promociones/promocion-slider/promocion-slider.css";
        document.head.appendChild(estilo);

        const script = document.createElement("script");
        script.src =
          "/components/promociones/promocion-slider/promocion-slider.js";
        script.onload = () => {
          if (typeof window.inicializarSliderUbicaciones === "function") {
            window.inicializarSliderUbicaciones();
          }
        };
        document.body.appendChild(script);
      });
  }
})();

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
        const currentHash = window.location.hash;
        if (currentHash == "#inicio") {
          history.replaceState(
            null,
            null,
            window.location.pathname + window.location.search,
          );
        }
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
        const currentHash = window.location.hash;
        if (currentHash == "#inicio") {
          history.replaceState(
            null,
            null,
            window.location.pathname + window.location.search,
          );
        }
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

(() => {
  const currentHash = window.location.hash;
  if (currentHash == "#inicio") {
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search,
    );
  }
})();
