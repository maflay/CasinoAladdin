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
