(() => {
  const modal = document.getElementById("modal_bono_apertura");
  const btnClose = document.getElementById("close_registrarse");
  const btnRegister = document.getElementById("btn_register_apertura");

  if (modal) {
    btnClose?.addEventListener("click", () => {
      Swal.fire({
        title: "Seguro de Cerrar?",
        text: "Se cerrará, si desea volver a ver, refresca la página.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si Quiero!",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          modal.style.display = "none";
        }
      });
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
  document.getElementById("open_gran_ina").addEventListener("click", () => {
    const modal = document.getElementById("modal_bono_apertura");
    modal.style.display = "flex";
  });
}
