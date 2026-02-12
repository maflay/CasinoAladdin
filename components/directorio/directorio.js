const url =
  "https://script.google.com/macros/s/AKfycbzm21nyUv2px9kwUQoOCVd6M0usuN2WkqaNN6SQ4Iy6HzafpAaAAdIF7T_sOs8xtMCs/exec";
const container = document.getElementById("content_table");
const titulo_direc = document.getElementById("titulo_direc");

container.innerHTML = `<div class="loader-overlay loader_directorio" id="loader">
                      <div class="spinner"></div>
                    </div>`;

function validateInfo() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        titulo_direc.innerHTML = "";
        return;
      }
      titulo_direc.innerHTML = "Directorio";

      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ciudad</th>
                <th>Local</th>
                <th>Nombre</th>
                <th>Número Local</th>
                <th>Seguridad</th>
                <th>Conductores</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${i + 1}</td>
                    <td>${registro.Ciudad}</td>
                    <td>${registro.Local}</td>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Numero_local}</td>
                    <td>${registro.Seguridad}</td>
                    <td>${registro.Conductores}</td>
                  </tr>
                `,
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;
    });
}

validateInfo();
