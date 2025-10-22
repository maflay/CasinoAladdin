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
const divElem = document.querySelector(".content_item>div");
const mensaje_end_ = document.getElementById("mensaje_end_");
const barra = document.getElementById("test_barra_inclinada");


function pruebaAnimacion() {
  divElem.style.animationName = "move-right";
  // divElem.style.animationDuration = "3s";
  divElem.style.animationTimingFunction = "linear";
  divElem.style.animationFillMode = "forwards";

  setTimeout(() => {
    divElem.style.animationName = "move-top";
    // divElem.style.animationDuration = "3s";
    divElem.style.animationTimingFunction = "linear";
    divElem.style.animationFillMode = "forwards";
  }, 3000);

  setTimeout(() => {
    divElem.classList.add("last_posicion");
    divElem.style.animationName = "desaparecer";
  }, 6000);

  setTimeout(() => {
    divElem.style.display = "none";
    divElem.style.animationName = "unset";
    mensaje_end_.style.animation = "modelview 1.5s ease forwards";
  }, 9000);


}

function barranimated(){
      barra.classList.remove("animar-inclinacion");
  void barra.offsetWidth; // reflow para reiniciar animación
  barra.classList.add("animar-inclinacion");
}

// barranimated();

// 🔹 Observar cuando el elemento entra al viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 👇 Detecta cuál elemento entró en pantalla
        if (entry.target.classList.contains("content_item")) {
          pruebaAnimacion(); // ▶️ inicia tu animación principal
        }

        if (entry.target.id === "content_logo_info") {
          barranimated(); // ⚙️ ejecuta tu otra animación
        }

        // Si quieres que se ejecute solo una vez por elemento:
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5, // activa cuando el 50% del elemento es visible
  }
);

// 🔹 Iniciar observación
const contentItem = document.querySelector(".content_item");
if (contentItem) observer.observe(contentItem);


const content_logo_info = document.getElementById("content_logo_info");
if(content_logo_info) observer.observe(content_logo_info);
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
