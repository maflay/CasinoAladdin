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
      // Cargar script dinámicamente
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
