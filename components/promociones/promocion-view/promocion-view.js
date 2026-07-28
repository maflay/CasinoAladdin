(() => {
  const solofechaCompleta = new Date().toLocaleString("es-CO", {
    month: "long",
  });

  const promociones_enero = document.getElementById("promociones_enero");
  const promociones_febrero = document.getElementById("promociones_febrero");
  const promociones_marzo = document.getElementById("promociones_marzo");
  const promociones_abril = document.getElementById("promociones_abril");
  const promociones_mayo = document.getElementById("promociones_mayo");
  const promociones_junio = document.getElementById("promociones_junio");
  const promociones_agosto = document.getElementById("promociones_agosto");

  if (solofechaCompleta == "enero") {
    promociones_enero.style.display = "flex";
  }

  if (solofechaCompleta == "febrero") {
    promociones_febrero.style.display = "flex";
  }

  if (solofechaCompleta == "marzo") {
    promociones_marzo.style.display = "flex";
  }

  if (solofechaCompleta == "abril") {
    promociones_abril.style.display = "flex";
  }

  if (solofechaCompleta == "mayo") {
    promociones_mayo.style.display = "flex";
  }

  if (solofechaCompleta == "junio") {
    promociones_junio.style.display = "flex";
  }

  if (solofechaCompleta == "julio") {
    promociones_junio.style.display = "flex";
  }

  if (solofechaCompleta == "agosto") {
    promociones_agosto.style.display = "flex";
  }
})();

(() => {
  const currentHash = window.location.hash;

  if (!currentHash) return;

  const cardLinks = document.querySelectorAll(".card-image > a");

  cardLinks.forEach((link) => {
    const linkHash = link.getAttribute("href");

    if (linkHash === currentHash) {
      const promoSection = link.closest(".card-promo");
      document.getElementById("_title_promos_view_").textContent =
        "Otras Promociones";

      if (promoSection) {
        promoSection.style.display = "none";
      }
    }
  });
})();
