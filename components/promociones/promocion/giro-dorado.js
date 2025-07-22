(()=>{
  const idpromo = 2;
  console.log(idpromo,"idpromo");
})();


(() => {
  fetch("/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("ubicacion-seccion");
      contenedor.innerHTML = html;

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.css";
      document.head.appendChild(estilo);

      const script = document.createElement("script");
      script.src = "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();

(() => {
  const btnNext1 = document.getElementById("next-to-1");
  const btnNext2 = document.getElementById("next-to-2");
  const btnNext3 = document.getElementById("next-to-3");

  if (btnNext1) {
    btnNext1.addEventListener("click", () => {
      navegarA("lampara");
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener("click", () => {
      navegarA("girodorado");
    });
  }

  if (btnNext3) {
    btnNext3.addEventListener("click", () => {
      navegarA("dadospoker");
    });
  }
})();

function toPromos(){
  navegarA("promociones");
}