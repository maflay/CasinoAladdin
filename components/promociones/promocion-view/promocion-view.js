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
  const cubo3 = document.getElementById("cubo3-ala");
  const cubo4 = document.getElementById("cubo4-ala");
  const promociones_enero_2026 = document.getElementById(
    "promociones_enero_2026"
  );
  cubo1.style.display = "none";
  cubo2.style.display = "none";
  cubo3.style.display = "none";
  cubo4.style.display = "none";
  promociones_enero_2026.style.display = "none";

  if (solofechaCompleta == "septiembre") {
    cubo1.style.display = "flex";
  } else if (solofechaCompleta == "octubre") {
    cubo2.style.display = "flex";
  } else if (solofechaCompleta == "noviembre") {
    cubo3.style.display = "flex";
  } else if (solofechaCompleta == "diciembre") {
    cubo4.style.display = "flex";
  } else if (solofechaCompleta == "enero") {
    promociones_enero_2026.style.display = "flex";
  }
})();
