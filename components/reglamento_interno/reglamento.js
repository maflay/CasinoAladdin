(() => {
  const _check_ala_ = document.getElementById("_check_ala_");
  const _check_fox_ = document.getElementById("_check_fox_");
  const _contenedor_reglamento_ = document.getElementById(
    "_contenedor_reglamento_",
  );
  const _contenedor_reglamento_fox_ = document.getElementById(
    "_contenedor_reglamento_fox_",
  );

  _check_ala_.addEventListener("change", () => {
    if (_check_ala_.checked == true) {
      _check_fox_.checked = false;
      _contenedor_reglamento_.style.display = "flex";
      _contenedor_reglamento_fox_.style.display = "none";
    } else {
      _check_fox_.checked = false;
      _contenedor_reglamento_.style.display = "none";
      _contenedor_reglamento_fox_.style.display = "none";
    }
  });

  _check_fox_.addEventListener("change", () => {
    if (_check_fox_.checked == true) {
      _check_ala_.checked = false;
      _contenedor_reglamento_.style.display = "none";
      _contenedor_reglamento_fox_.style.display = "flex";
    } else {
      _check_ala_.checked = false;
      _contenedor_reglamento_.style.display = "none";
      _contenedor_reglamento_fox_.style.display = "none";
    }
  });

  let longitud_reglamento = 80;

  for (let i = 1; i <= longitud_reglamento; i++) {
    let numeroPagina = String(i).padStart(2, "0");
    let img = document.createElement("img");
    img.src = `/resources/Recursos_reglamento/RIT_AHC_PUBLICADO_EN_LA_PAGINA_compressed_page-00${numeroPagina}.jpg`;
    _contenedor_reglamento_.appendChild(img);
  }

  let longitud_reglamento_fox = 79;

  for (let i = 1; i <= longitud_reglamento_fox; i++) {
    let numeroPagina_fox = String(i).padStart(2, "0");
    let img = document.createElement("img");
    img.src = `/resources/Recursos_reglamento/reglamento_fox/RIT FOX PUBLICADO EN LA PAGINA_page-00${numeroPagina_fox}.jpg`;
    _contenedor_reglamento_fox_.appendChild(img);
  }
})();
