(() => {
  const btnTocasinos = document.getElementById("toCasinos");

  if (btnTocasinos) {
    btnTocasinos.addEventListener("click", () => {
      navegarA("inicio?id=ubicaciones");
    });
  }
})();
