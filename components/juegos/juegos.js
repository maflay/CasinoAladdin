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

(() => {
  const btntoBlackJack = document.getElementById("toBlackJack");
  const btntoRuleta = document.getElementById("toRuleta");
  const btntoBaccarat = document.getElementById("toBaccarat");

  const btntoRuletaelectronica = document.getElementById("toRuletaelectronica");
  const btntoHipodromoelectrico = document.getElementById(
    "toHipodromoelectronico"
  );
  const btntoBingoelectronico = document.getElementById("toBingoelectronico");

  const btntoMaquinasindividuales = document.getElementById("toMaquinasindividuales");

  if (btntoBlackJack) {
    btntoBlackJack.addEventListener("click", () => {
      navegarA("blackjack");
    });
  }

  if (btntoRuleta) {
    btntoRuleta.addEventListener("click", () => {
      navegarA("ruleta");
    });
  }

  if (btntoBaccarat) {
    btntoBaccarat.addEventListener("click", () => {
      navegarA("baccarat");
    });
  }

  if (btntoRuletaelectronica) {
    btntoRuletaelectronica.addEventListener("click", () => {
      navegarA("ruletaelectronica");
    });
  }

  if (btntoHipodromoelectrico) {
    btntoHipodromoelectrico.addEventListener("click", () => {
      navegarA("hipodromoelectrico");
    });
  }

  if (btntoBingoelectronico) {
    btntoBingoelectronico.addEventListener("click", () => {
      navegarA("bingoelectronico");
    });
  }

  if(btntoMaquinasindividuales){
   btntoMaquinasindividuales.addEventListener("click", () => {
      navegarA("maquinasindividuales");
    });
  }
})();
