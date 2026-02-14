(() => {
  const modal = document.getElementById("modal_bono_apertura");
  const btnClose = document.getElementById("close_registrarse");
  const btnRegister = document.getElementById("btn_register_apertura");

  if (modal) {
    btnClose?.addEventListener("click", () => {
      modal.style.display = "none";
    });

    btnRegister?.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
})();

function validatHash() {
  const hash = window.location.hash;

  if (hash.includes("casinosonesta")) {
    const modal = document.getElementById("modal_bono_apertura");
    modal.style.display = "none";
  }
}

validatHash();

if (document.getElementById("open_gran_ina")) {
  console.log("existe");
  document.getElementById("open_gran_ina").addEventListener("click", () => {
    const modal = document.getElementById("modal_bono_apertura");
    modal.style.display = "flex";
  });
}
