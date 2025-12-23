(() => {
  fetch("/components/footer/footer.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("view_footer");
      contenedor.innerHTML = html;
      const version = Date.now();
      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = `/components/footer/footer.css?v=${version}`;
      document.head.appendChild(estilo);

      const script = document.createElement("script");
      script.src = `/components/footer/footer.js?v=${version}`;
      document.body.appendChild(script);
    });
})();


console.log(window.location.hash);