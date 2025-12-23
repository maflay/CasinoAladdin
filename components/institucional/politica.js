function dateYear() {
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  document.getElementById("fecha_site").textContent = fechaCompleta;
}

dateYear();