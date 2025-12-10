function toPromos(){
  navegarA("promociones");
}

(() => {
  fetch("/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("ubicacion-seccion");
      contenedor.innerHTML = html;

      // Cargar CSS dinámicamente
      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.css";
      document.head.appendChild(estilo);

      // Cargar script dinámicamente
      const script = document.createElement("script");
      script.src =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();


(() => {
  if (document.getElementById("content-banner-membresia")) {
    fetch("/components/membresia/bannerMembresia/bannerMembresia.html")
      .then((res) => res.text())
      .then((html) => {
        const contenedor = document.getElementById("content-banner-membresia");
        contenedor.innerHTML = html;

        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href =
          "/components/membresia/bannerMembresia/bannerMembresia.css";
        document.head.appendChild(estilo);
        // Cargar script dinámicamente
        const script = document.createElement("script");
        script.src = "/components/membresia/bannerMembresia/bannerMembresia.js";
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