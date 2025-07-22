(() => {
  const superBingo = document.getElementById("next-to-super-bingo");
  const casPremios = document.getElementById("next-to-cascada-premios");
  if (superBingo) {
    superBingo.addEventListener("click", () => {
      navegarA("superbingo");
    });
  }
  if (casPremios) {
    casPremios.addEventListener("click", () => {
      navegarA("cascadapremios");
    });
  }
})();

(() => {
  fetch("/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("ubicacion-seccion");
      contenedor.innerHTML = html;

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.css";
      document.head.appendChild(estilo);

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


function toPromos(){
  navegarA("promociones?id=toMymawi");
}