function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}

function toLampara() {
  navegarA("lampara");
}

function toGiroDorado() {
  navegarA("girodorado");
}

function toDadosPoker() {
  navegarA("dadospoker");
}

function toMymawitepremia() {
  navegarA("mymawitepremia");
}

function toCascadapremios() {
  navegarA("cascadapremios");
}

function toGanaya() {
  navegarA("ganaya");
}

function toBingolocura() {
  navegarA("bingolocura");
}

function toSuperbingo() {
  navegarA("superbingo");
}

// (()=> {
// document.getElementById("toBlackjackexpress").addEventListener("click", ()=> {
//   navegarA("blackjackexpress");
// })

// document.getElementById("toTrenpremios").addEventListener("click", ()=> {
//   navegarA("trenpremios");
// })
// })();

(() => {
  const solofechaCompleta = new Date().toLocaleString("es-CO", {
    month: "long",
  });

  const cubo1 = document.getElementById("cubo1-ala");
  const cubo2 = document.getElementById("cubo2-ala");
  cubo1.style.display = "none";
  cubo2.style.display = "flex";

  if (solofechaCompleta == "septiembre") {
    cubo1.style.display = "flex";
    cubo2.style.display = "none";
  } else if (solofechaCompleta == "octubre") {
    cubo1.style.display = "none";
    cubo2.style.display = "flex";
  }
})();
