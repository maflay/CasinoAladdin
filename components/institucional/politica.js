function dateYear() {
  const _content_politicas_datos_ = document.getElementById(
    "_content_politicas_datos_",
  );
  let longitud_politica = 35;

  for (let i = 1; i <= longitud_politica; i++) {
    let numeroPagina = String(i).padStart(2, "0");
    let img = document.createElement("img");
    img.src = `/resources/politica_De_datos_personales/PoliticaDatosPersonales-00${numeroPagina}.jpg`;
    _content_politicas_datos_.appendChild(img);
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  document.getElementById("fecha_site").textContent = fechaCompleta;
}

dateYear();
