document.querySelector(".fled").addEventListener("click", () => {
  document.getElementById("casino-select").focus();
  document.getElementById("casino-select").dispatchEvent(new MouseEvent("mousedown"));
});