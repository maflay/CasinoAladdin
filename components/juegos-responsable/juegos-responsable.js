function toTest() {
  window.open("https://tomaelcontrol.coljuegos.gov.co/formulario/", "_blank");
}

function downForm() {
  window.open("/document/FORMULARIO-PERSONAL-DE-AUTOEXCLUSION.pdf", "_blank");
}
(() => {
  const btntoControl = document.getElementById("toma-control");

  btntoControl.addEventListener("click", () => {
    window.open("https://tomaelcontrol.coljuegos.gov.co/", "_blank");
  });
})();

function toDowgame() {
  window.open(
    "/document/programa_juego_responsable_aladdin_hotel__casino_sas.pdf",
    "_blank"
  );
}
