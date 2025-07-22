function footerRegister() {
  const emailInput = document.getElementById("email-footer");
  const email = encodeURIComponent(emailInput.value); // Codifica el correo
  const loading = document.getElementById("loading");

  if (!email) {
    alert("Por favor ingresa un correo válido.");
    return;
  }
  window.scrollTo(0, 0);
  navegarA(`contacto?email=${email}`);
  document.getElementById("email-footer").value = "";
}