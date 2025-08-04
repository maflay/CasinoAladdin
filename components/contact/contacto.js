document.querySelector(".fled").addEventListener("click", () => {
  document.getElementById("casino-select").focus();
  document
    .getElementById("casino-select")
    .dispatchEvent(new MouseEvent("mousedown"));
});

function infoSendContacto() {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const numero = document.getElementById("numero");
  const opcion = document.getElementById("opcion");
  const descripcion = document.getElementById("descripcion");
  const condiciones = document.getElementById("condiciones");
  const ciudad = document.getElementById("ciudad");
  const loader = document.getElementById("loading");
  loader.style.display = "flex";
  const nombreVal = nombre.value;
  const correoVal = correo.value;
  const numeroVal = numero.value;
  const opcionVal = opcion.value;
  const descripcionVal = descripcion.value;
  const condicionesVal = condiciones.value;
  const ciudadVal = ciudad.value;
  const url = "";

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  const data = {
    nombre: nombreVal,
    correo: correoVal,
    telefono: numeroVal,
    ciudad: ciudadVal,
    opcion: opcionVal,
    fechasoli: hora + " - " + fecha,
    descripcion: descripcionVal,
    terminos: condicionesVal,
  };

  console.log(data, "data");

  setTimeout(() => {
    loader.style.display = "none";
  }, 4000);

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      console.log("entro a la supuesta creacion");
    })
    .catch((error) => {
      console.warn(error);
      console.log("valiendo mierda");
    });
}
