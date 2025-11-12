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
