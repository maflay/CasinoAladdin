
(() => {
  const btnNext1 = document.getElementById("next-to-1");
  const btnNext2 = document.getElementById("next-to-2");
  const btnNext3 = document.getElementById("next-to-3");

  if (btnNext1) {
    btnNext1.addEventListener("click", () => {
      navegarA("dadospoker");
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener("click", () => {
      navegarA("ruledelasuerte");
    });
  }

  if (btnNext3) {
    btnNext3.addEventListener("click", () => {
      navegarA("dadospoker");
    });
  }
})();