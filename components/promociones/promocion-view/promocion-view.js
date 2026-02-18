(() => {
  const solofechaCompleta = new Date().toLocaleString("es-CO", {
    month: "long",
  });

  const promociones_enero_2026 = document.getElementById(
    "promociones_enero_2026",
  );
  const promociones_febrero = document.getElementById("promociones_febrero");
  const cubo1 = document.getElementById("cubo1-ala");
  const cubo2 = document.getElementById("cubo2-ala");
  const cubo4 = document.getElementById("cubo4-ala");

  promociones_enero_2026.style.display = "none";
  promociones_febrero.style.display = "none";

  cubo1.style.display = "none";
  cubo2.style.display = "none";
  cubo4.style.display = "none";

  if (solofechaCompleta == "enero") {
    promociones_enero_2026.style.display = "flex";
  }

  if (solofechaCompleta == "febrero") {
    promociones_febrero.style.display = "flex";
  }

  if (solofechaCompleta == "septiembre") {
    cubo1.style.display = "flex";
  }

  if (solofechaCompleta == "octubre") {
    cubo2.style.display = "flex";
  }

  if (solofechaCompleta == "diciembre") {
    cubo4.style.display = "flex";
  }
})();
(() => {
  const allitem = document.querySelectorAll(".card-content p");

  allitem.forEach((item) => {
    let item_len = item.textContent;
    let long_item = item_len.length;
    let end_long;
    if (long_item > 150) {
      end_long = item_len.slice(0, 155) + "...";
      item.textContent = end_long;
    }
  });
})();
