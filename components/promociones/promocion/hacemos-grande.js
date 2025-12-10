function actionEfect() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Genera ráfagas aleatorias en distintas posiciones
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.8;
      sparkleBurst(x, y, 18);
    }, i * 400);
  }
}

function sparkleBurst(x, y, count = 20) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    s.className = "sparkle";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.setProperty("--dx", `${(Math.random() - 0.5) * 100}px`);
    s.style.setProperty("--dy", `${-Math.random() * 80 - 20}px`);
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 650);
  }
}

setTimeout(() => {
  actionEfect();

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });
}, 800);

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

function toPromos() {
  navegarA("promociones");
}

document.getElementById("btn_conocer_promo").addEventListener("click", () => {
  irASeccionCoordenadas();
});

function irASeccionCoordenadas() {
  const destino = document.getElementById("terminos-hacemos-en-grande");

  if (destino) {
    const posicionY = destino.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: posicionY,
      behavior: "smooth",
    });
  }
}

(() => {
  const solofechaCompleta = new Date().toLocaleString("es-CO", {
    month: "long",
  });

  console.log(solofechaCompleta);
  const promos_noviembre = document.getElementById("promos_noviembre");
  const promos_diciembre = document.getElementById("promos_diciembre");

  if (solofechaCompleta == "noviembre") {
    promos_noviembre.style.display = "flex";
  } else if (solofechaCompleta == "diciembre") {
    promos_diciembre.style.display = "flex";
  }
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