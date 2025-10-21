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

// (()=> {

  
//   const selectElem = document.querySelector("select");
//   const startBtn = document.querySelector("button");
//   const divElem = document.querySelector(".content_item>div");
//   const barra = document.getElementById("test_barra_inclinada");
  
//   function pruebaAnimacion() {
//     barra.classList.remove("animar-inclinacion");
//     void barra.offsetWidth; // reflow para reiniciar animación
//     barra.classList.add("animar-inclinacion");
//   }
  
//   setTimeout(() => {
//     pruebaAnimacion();
//   }, 120);
// })();