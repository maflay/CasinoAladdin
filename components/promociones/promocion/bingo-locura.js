(() => {
  const ganaya = document.getElementById("next-to-gana-ya");
  const superbingo = document.getElementById("next-to-super-bingo");

  if (ganaya) {
    ganaya.addEventListener("click", () => {
      navegarA("ganaya");
    });
  }

  if (superbingo) {
    superbingo.addEventListener("click", () => {
      navegarA("superbingo");
    });
  }
})();

function toPromos(){
  navegarA("promociones?id=toBingolocura");
}

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
