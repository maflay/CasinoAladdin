// // 1. Ruta de tu archivo PDF
// const rutaPDF = "/document/RIT_AHC_PUBLICADO_EN_LA_PAGINA.pdf";

// // 2. Parámetros para ocultar la barra de herramientas, menú de navegación y zoom lateral
// const parametrosPDF =
//   "#toolbar=0&navpanes=0&scrollbar=1&statusbar=0&messages=0&view=FitH";

// // 3. Seleccionar el contenedor
// const contenedor = document.querySelector(
//   "._content_main_reglamento_interno_ala_",
// );

// // 4. Insertar el iframe con los parámetros aplicados
// contenedor.innerHTML = `<iframe src="${rutaPDF}${parametrosPDF}" width="100%" height="100%" style="border: none;"></iframe>`;

(() => {
    const _contenedor_reglamento_ = document.getElementById("_contenedor_reglamento_");
    let longitud_reglamento = 80;

    for (let i = 1; i <= longitud_reglamento; i++) { // Empezamos en 1 para las páginas
        // Convierte el número a texto y asegura 2 dígitos (ej: 1 -> "01", 10 -> "10")
        let numeroPagina = String(i).padStart(2, "0"); 
        
        let img = document.createElement("img");
        
        // Corregido: Se eliminó el 'src=' repetido dentro del string
        img.src = `/resources/Recursos_reglamento/RIT_AHC_PUBLICADO_EN_LA_PAGINA_compressed_page-00${numeroPagina}.jpg`;
        
        // Inserta la imagen en tu contenedor HTML
        _contenedor_reglamento_.appendChild(img);
    }
})();
