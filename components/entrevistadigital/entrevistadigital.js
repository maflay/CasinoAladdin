(() => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const tipo_documento = document.getElementById("tipo_documento");
  const num_documento = document.getElementById("num_documento");
  const fecha_nacimiento = document.getElementById("fecha_nacimiento");
  const correo_entrevista = document.getElementById("correo_entrevista");
  const help = document.getElementById("correo_help");
  const ciudad_referencia = document.getElementById("ciudad_referencia");
  const tel_numero = document.getElementById("tel_numero");
  const cargo_aspira = document.getElementById("cargo_aspira");
  const ultimo_grado = document.getElementById("ultimo_grado");
  const institucion_entre = document.getElementById("institucion_entre");
  const titulo_obt = document.getElementById("titulo_obt");
  const cursos_obt = document.getElementById("cursos_obt");
  const ultimo_trabajo = document.getElementById("ultimo_trabajo");
  const funciones_ultimo_trabajo = document.getElementById(
    "funciones_ultimo_trabajo",
  );
  const tiempo_laborado = document.getElementById("tiempo_laborado");
  const motivo_ultimo_trabajo = document.getElementById(
    "motivo_ultimo_trabajo",
  );
  const exp_considerada = document.getElementById("exp_considerada");
  const experiencia_considerada = document.getElementById("fortalezas");
  const aspecto_mejorar = document.getElementById("aspecto_mejorar");
  const uso_herramientas = document.getElementById("uso_herramientas");
  const menejo_presion = document.getElementById("menejo_presion");
  const trabajo_en_equipo = document.getElementById("trabajo_en_equipo");
  const motivo_postulacion = document.getElementById("motivo_postulacion");
  const logro_profesional = document.getElementById("logro_profesional");
  const saber_de_la_empresa = document.getElementById("saber_de_la_empresa");
  const diferencia_otros = document.getElementById("diferencia_otros");
  const actual_empleo = document.getElementById("actual_empleo");
  const disponibilidad_inicio = document.getElementById(
    "disponibilidad_inicio",
  );
  const aspiracion_salarial = document.getElementById("aspiracion_salarial");
  const trabajar_fines = document.getElementById("trabajar_fines");
  const disponible_traslado = document.getElementById("disponible_traslado");
  const comentario_adicional = document.getElementById("comentario_adicional");
  const autorizo_entre = document.getElementById("autorizo_entre");
  const foto_entre = document.getElementById("foto_entre");

  // preguntas destreza
  const logica_test = document.getElementById("logica_test");
  const memoria_test = document.getElementById("memoria_test");
  const razonamiento_test = document.getElementById("razonamiento_test");
  const matematica_test = document.getElementById("matematica_test");
  const compresion_test = document.getElementById("compresion_test");
  const observacion_test = document.getElementById("observacion_test");
  const patron_test = document.getElementById("patron_test");

  const no_tengo_xp = document.getElementById("no_tengo_xp");

  no_tengo_xp.addEventListener("click", () => {
    if (no_tengo_xp.checked == true) {
      document.getElementById("seccion_expe_laboral").style.display = "none";
    } else {
      document.getElementById("seccion_expe_laboral").style.display = "flex";
    }
  });

  const final_msj = document.getElementById("final_msj");

  const content_form_entrevista = document.getElementById(
    "content_form_entrevista",
  );
  const hacer_test = document.getElementById("hacer_test");

  content_form_entrevista.style.display = "none";
  hacer_test.addEventListener("click", () => {
    if (hacer_test.checked == true) {
      content_form_entrevista.style.display = "flex";
    } else {
      content_form_entrevista.style.display = "none";
    }
  });

  const btn_send_entrevista = document.getElementById("btn_send_entrevista");

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
  const loader = document.getElementById("loading");

  let formulario = document.getElementById("content_main_e_digital");
  const url =
    "https://script.google.com/macros/s/AKfycbyn4VrjlPGx0mR7RUuQWXbcWlwFjtubA2sMZz8JQBZkzHla2PSvTfn5sA1wFdLuRcE/exec";

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  // Comprime la imagen: redimensiona y baja calidad
  function compressImage(
    file,
    { maxWidth = 800, maxHeight = 800, quality = 0.7 } = {},
  ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => reject(reader.error);
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Mantener proporción pero limitar tamaño
          const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
          width = width * ratio;
          height = height * ratio;

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          // Dibujar imagen escalada
          ctx.drawImage(img, 0, 0, width, height);

          // Sacar dataURL comprimido en JPG
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  motivo_postulacion.addEventListener("change", () => {
    if (motivo_postulacion.value == "Si") {
      document.getElementById("familiar_conocido").style.display = "block";
    } else {
      document.getElementById("familiar_conocido").style.display = "none";
    }
  });

  const respuestas = {};

  const MAP_INTELIGENCIAS = {
    "Lógico-matemática": [1, 10, 19],
    "Lingüística-verbal": [2, 11, 20],
    "Espacial-visual": [3, 12, 21],
    "Corporal-kinestésica": [4, 13, 22],
    Musical: [5, 14, 23],
    Interpersonal: [6, 15, 24],
    Intrapersonal: [7, 16, 25],
    Naturalista: [8, 17, 26],
    Existencial: [9, 18, 27],
  };

  document
    .querySelectorAll('input[type="checkbox"][id^="opc_"]')
    .forEach((chk) => {
      chk.addEventListener("change", (e) => {
        const input = e.target;

        const parts = input.id.split("_");
        const valor = Number(parts[3]); // 1..5
        const numPregunta = Number(parts[5]); // 1..27

        const rowChecks = document.querySelectorAll(
          `input[id$="_pre_${numPregunta}"]`,
        );
        rowChecks.forEach((c) => {
          if (c !== input) c.checked = false;
        });

        if (input.checked) {
          respuestas[numPregunta] = valor;
        } else {
          delete respuestas[numPregunta];
        }

        const totales = calcularTotales(respuestas);
        pintarResultados(totales);
      });
    });

  function pintarResultados(totales) {
    const ordenadas = Object.entries(totales).sort((a, b) => b[1] - a[1]);

    // console.log("INTELIGENCIAS ORDENADAS:", ordenadas);

    // const cont = document.getElementById("resultados-intel");
    // if (!cont) return;

    // cont.innerHTML = `
    //   <h3>Resultados</h3>
    //   <ul>
    //     ${ordenadas
    //       .map(
    //         ([nombre, puntaje]) =>
    //           `<li><strong>${nombre}</strong>: ${puntaje} / 15</li>`
    //       )
    //       .join("")}
    //   </ul>
    //   <p><strong>Más alta:</strong> ${
    //     ordenadas[0] ? ordenadas[0][0] : "Sin datos"
    //   }</p>
    // `;
  }

  function calcularTotales(respuestasPorPregunta) {
    const totales = {};
    Object.keys(MAP_INTELIGENCIAS).forEach((intel) => (totales[intel] = 0));

    for (const [nombreIntel, preguntas] of Object.entries(MAP_INTELIGENCIAS)) {
      let suma = 0;
      preguntas.forEach((numPre) => {
        const val = respuestasPorPregunta[numPre] || 0;
        suma += val;
      });
      totales[nombreIntel] = suma;
    }

    return totales;
  }

  ultimo_grado.addEventListener("change", () => {
    if (ultimo_grado.value == "Primaria") {
      final_msj.style.display = "none";
    } else {
      final_msj.style.display = "flex";
    }
  });

  // const memoria_test_num = document.getElementById("memoria_test_num");
  // const codigo = Math.floor(10000 + Math.random() * 90000);
  // memoria_test_num.textContent = "Mostrar";
  // memoria_test_num.style.cursor = "Pointer";

  // memoria_test_num.addEventListener("click", () => {
  //   memoria_test_num.textContent = codigo;
  //   setTimeout(() => {
  //     memoria_test_num.textContent = "";
  //   }, 4500);
  // });

  function buildPayloadResultados() {
    const totales = calcularTotales(respuestas);

    const ordenadas = Object.entries(totales).sort((a, b) => b[1] - a[1]);

    const payload = {
      tipo: "test_inteligencias",
      respuestas_pregunta: respuestas,
      totales_inteligencia: totales,
      orden_desc: ordenadas,
      inteligencia_principal: ordenadas[0] ? ordenadas[0][0] : null,
      puntaje_principal: ordenadas[0] ? ordenadas[0][1] : null,
    };

    return payload;
  }

  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  correo_entrevista.addEventListener("input", () => {
    const val = correo_entrevista.value.trim();

    const ok = reEmail.test(val);

    correo_entrevista.classList.toggle("invalid", !ok);
    correo_entrevista.classList.toggle("valid", ok);

    correo_entrevista.setCustomValidity(ok ? "" : "Correo inválido");
    help.textContent = ok
      ? ""
      : "Escribe un correo válido (ej. usuario@aladdin.com)";
  });

  btn_send_entrevista.addEventListener("click", () => {
    const identidad = validateIndetidad();
    // if (identidad > 40) {
    if (ultimo_grado.value == "Primaria") {
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          title: "Gracias por tu Participación!",
          text: "Basándonos en las respuestas proporcionadas en este formulario, su perfil no cumple con los requisitos mínimos indispensables para participar en este estudio/proceso.",
          icon: "success",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
          },
        });
      }, 3000);
      return;
    } else {
      handleSubmit();
      return;
    }
    // } else {
    //   handleSubmit();
    // }
  });

  function validateIndetidad() {
    const fechaValor = fecha_nacimiento.value;
    if (fechaValor) {
      const fecha = new Date(fechaValor);
      const anio = fecha.getFullYear();
      const anioActual = new Date().getFullYear();
      const edad = anioActual - anio;
      return edad;
    }
  }

  async function handleSubmit() {
    validateIndetidad();
    let val_correo = "";
    // val_correo = "pruebajfdm@gmail.com";
    if (ciudad_referencia.value == "cali") {
      val_correo = "seleccion@vivealaddin.com";
    } else if (ciudad_referencia.value == "bogota") {
      val_correo = "bog_auxnomina@vivealaddin.com";
    } else if (ciudad_referencia.value == "barranquilla") {
      val_correo = "baq_operativo@vivealaddin.com";
    } else if (ciudad_referencia.value == "pereira") {
      val_correo = "per_asisadtvo@vivealaddin.com";
    } else if (ciudad_referencia.value == "tulua") {
      val_correo = "dir.a09@vivealaddin.com";
    } else if (ciudad_referencia.value == "buga") {
      val_correo = "dir.A38@vivealaddin.com";
    } else if (ciudad_referencia.value == "monteria") {
      val_correo = "carlosg@vivealaddin.com";
    }

    let inte = buildPayloadResultados();

    let nombre_val = nombre.value;
    let apellido_val = apellido.value;
    let tipo_documento_val = tipo_documento.value;
    let num_documento_val = num_documento.value;
    let fecha_nacimiento_val = fecha_nacimiento.value;
    let correo_entrevista_val = correo_entrevista.value;
    let ciudad_referencia_val = ciudad_referencia.value;
    let tel_numero_val = tel_numero.value;
    let cargo_aspira_val = cargo_aspira.value;
    let foto_entre_val = foto_entre.files?.[0];
    let ultimo_grado_val = ultimo_grado.value;
    let institucion_entre_val = institucion_entre.value;
    let titulo_obt_val = titulo_obt.value;
    let cursos_obt_val = cursos_obt.value;
    let ultimo_trabajo_val =
      no_tengo_xp.checked == true ? "Sin Experiencia." : ultimo_trabajo.value;
    let funciones_ultimo_trabajo_val =
      no_tengo_xp.checked == true
        ? "Sin Experiencia."
        : funciones_ultimo_trabajo.value;
    let tiempo_laborado_val =
      no_tengo_xp.checked == true ? "Sin Experiencia." : tiempo_laborado.value;
    let motivo_ultimo_trabajo_val = motivo_ultimo_trabajo.value;
    let exp_considerada_val =
      no_tengo_xp.checked == true ? "Sin Experiencia." : exp_considerada.value;
    let experiencia_considerada_val = experiencia_considerada.value;
    let aspecto_mejorar_val = aspecto_mejorar.value;
    let uso_herramientas_val = uso_herramientas.value;
    let menejo_presion_val = menejo_presion.value;
    let trabajo_en_equipo_val = trabajo_en_equipo.value;
    let motivo_postulacion_val = motivo_postulacion.value;
    let logro_profesional_val =
      motivo_postulacion_val == "Si"
        ? logro_profesional.value
        : "No tiene conocidos";
    let saber_de_la_empresa_val = saber_de_la_empresa.value;
    let diferencia_otros_val = diferencia_otros.value;
    let actual_empleo_val = actual_empleo.value;
    let disponibilidad_inicio_val = disponibilidad_inicio.value;
    let aspiracion_salarial_val = aspiracion_salarial.value;
    let trabajar_fines_val = trabajar_fines.value;
    let disponible_traslado_val = disponible_traslado.value;
    let comentario_adicional_val = comentario_adicional.value;
    let autorizo_entre_val = autorizo_entre.checked;
    let inteligencia1 =
      hacer_test.checked == true
        ? inte.orden_desc[0].join(" - ")
        : "No realizo el test";
    let inteligencia2 =
      hacer_test.checked == true
        ? inte.orden_desc[1].join(" - ")
        : "No realizo el test";
    let inteligencia3 =
      hacer_test.checked == true
        ? inte.orden_desc[2].join(" - ")
        : "No realizo el test";
    let inteligencia4 =
      hacer_test.checked == true
        ? inte.orden_desc[3].join(" - ")
        : "No realizo el test";
    let inteligencia5 =
      hacer_test.checked == true
        ? inte.orden_desc[4].join(" - ")
        : "No realizo el test";
    let inteligencia6 =
      hacer_test.checked == true
        ? inte.orden_desc[5].join(" - ")
        : "No realizo el test";
    let inteligencia7 =
      hacer_test.checked == true
        ? inte.orden_desc[6].join(" - ")
        : "No realizo el test";
    let inteligencia8 =
      hacer_test.checked == true
        ? inte.orden_desc[7].join(" - ")
        : "No realizo el test";
    let inteligencia9 =
      hacer_test.checked == true
        ? inte.orden_desc[8].join(" - ")
        : "No realizo el test";

    if (
      nombre_val == "" ||
      apellido_val == "" ||
      tipo_documento_val == "" ||
      num_documento_val == "" ||
      fecha_nacimiento_val == "" ||
      correo_entrevista_val == "" ||
      ciudad_referencia_val == "" ||
      tel_numero_val == "" ||
      ultimo_grado_val == "" ||
      experiencia_considerada_val == "" || //Fortalezas
      aspecto_mejorar_val == "" ||
      motivo_postulacion_val == "" ||
      saber_de_la_empresa_val == "" ||
      actual_empleo_val == "" ||
      disponibilidad_inicio_val == "" ||
      trabajar_fines_val == "" ||
      disponible_traslado_val == "" ||
      autorizo_entre_val == false ||
      !foto_entre_val
    ) {
      Swal.fire({
        title: "Antes de Enviar!",
        text: "Por favor completa todos los campos obligatorios.",
        icon: "warning",
        allowOutsideClick: false,
        heightAuto: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }

    if (hacer_test.checked == true) {
      if (
        inte.orden_desc[0][1] == 0 ||
        inte.orden_desc[1][1] == 0 ||
        inte.orden_desc[2][1] == 0 ||
        inte.orden_desc[3][1] == 0 ||
        inte.orden_desc[4][1] == 0 ||
        inte.orden_desc[5][1] == 0 ||
        inte.orden_desc[6][1] == 0 ||
        inte.orden_desc[7][1] == 0 ||
        inte.orden_desc[8][1] == 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "Test Pendiente",
          html: "Haz el test, o puedes desmarcar la casilla.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
          },
        });
        return;
      }
    }

    const base64 = await compressImage(foto_entre_val, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.7,
    });

    let data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre_val + " " + apellido_val,
      valor_4: tipo_documento_val,
      valor_5: num_documento_val,
      valor_6: fecha_nacimiento_val,
      valor_7: correo_entrevista_val,
      valor_8: ciudad_referencia_val,
      valor_9: tel_numero_val,
      valor_10: cargo_aspira_val,
      valor_11: ultimo_grado_val,
      valor_12: institucion_entre_val,
      valor_13: titulo_obt_val,
      valor_14: cursos_obt_val,
      valor_15: ultimo_trabajo_val,
      valor_16: funciones_ultimo_trabajo_val,
      valor_17: tiempo_laborado_val,
      valor_18: motivo_ultimo_trabajo_val,
      valor_19: exp_considerada_val,
      valor_20: experiencia_considerada_val,
      valor_21: aspecto_mejorar_val,
      valor_22: uso_herramientas_val,
      valor_23: menejo_presion_val,
      valor_24: trabajo_en_equipo_val,
      valor_25: motivo_postulacion_val,
      valor_26: logro_profesional_val,
      valor_27: saber_de_la_empresa_val,
      valor_28: diferencia_otros_val,
      valor_29: actual_empleo_val,
      valor_30: disponibilidad_inicio_val,
      valor_31: aspiracion_salarial_val,
      valor_32: trabajar_fines_val,
      valor_33: disponible_traslado_val,
      valor_34: comentario_adicional_val,
      valor_35: autorizo_entre_val,
      valor_36: base64,
      valor_37: val_correo,
      valor_38: inteligencia1,
      valor_39: inteligencia2,
      valor_40: inteligencia3,
      valor_41: inteligencia4,
      valor_42: inteligencia5,
      valor_43: inteligencia6,
      valor_44: inteligencia7,
      valor_45: inteligencia8,
      valor_46: inteligencia9,
    };

    Swal.fire({
      title: "Estas Seguro?",
      text: "Revisa tu información antes del envió!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e7a2dff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy de acuerdo!",
      heightAuto: false,
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        loader.style.display = "flex";
        fetch(url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            let inputs = formulario.querySelectorAll(
              'input[type="text"], select, date, file, checkbox',
            );
            foto_entre.value = "";
            fecha_nacimiento.value = "";
            autorizo_entre.checked = false;

            inputs.forEach((input) => {
              input.value = "";
            });
            loader.style.display = "none";
            Swal.fire({
              title: "Exito!",
              text: "Tu entrevista fue enviada de manera exitosa.",
              icon: "success",
              allowOutsideClick: false,
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            loader.style.display = "none";
            Swal.fire({
              title: "Error en el envio!",
              html: `No se pudo enviar el registro por favor intentalo mas tarde, o puedes dirigirte a la sección<a href="#trabajaconosotros"></a> .`,
              icon: "success",
              allowOutsideClick: false,
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
              },
            });
          });
      }
    });
  }
  foto_entre.addEventListener("change", () => {
    let _name_pinture_ = document.getElementById("_name_pinture_");
    let foto_entre_val = foto_entre.files?.[0];

    if (foto_entre_val) {
      const nombreOriginal = foto_entre_val.name;
      _name_pinture_.textContent = nombreOriginal;
    } else {
      _name_pinture_.textContent = "Ningún archivo seleccionado";
    }
  });

    // <div class="content_main_content">
    //     <div id="_content_video_show_" class="_content_video_show_ ">
    //         <video autoplay muted loop playsinline style="object-fit: cover;width: 100%; height: 100vh;">
    //             <source src="/resource/A.mov" type="video/mp4">
    //             Tu navegador no soporta videos HTML5.
    //         </video>
    //     </div>
    //     <div class="fondo_juego">            
    //         <button id="btn_mostrar_video" class="btn btn-primary">mostrar Video</button>
    //     </div>
    //     <div>
    //         <p>MACACO</p>
    //     </div>
    // </div>

       // <div class="content_main_content">
    //     <div id="_content_video_show_" class="_content_video_show_ ">
    //         <video autoplay muted loop playsinline style="object-fit: cover;width: 100%; height: 100vh;">
    //             <source src="/resource/A.mov" type="video/mp4">
    //             Tu navegador no soporta videos HTML5.
    //         </video>
    //     </div>
    //     <div class="fondo_juego">            
    //         <button id="btn_mostrar_video" class="btn btn-primary">mostrar Video</button>
    //     </div>
    //     <div>
    //         <p>MACACO</p>
    //     </div>
    // </div>

       // <div class="content_main_content">
    //     <div id="_content_video_show_" class="_content_video_show_ ">
    //         <video autoplay muted loop playsinline style="object-fit: cover;width: 100%; height: 100vh;">
    //             <source src="/resource/A.mov" type="video/mp4">
    //             Tu navegador no soporta videos HTML5.
    //         </video>
    //     </div>
    //     <div class="fondo_juego">            
    //         <button id="btn_mostrar_video" class="btn btn-primary">mostrar Video</button>
    //     </div>
    //     <div>
    //         <p>MACACO</p>
    //     </div>
    // </div>

       // <div class="content_main_content">
    //     <div id="_content_video_show_" class="_content_video_show_ ">
    //         <video autoplay muted loop playsinline style="object-fit: cover;width: 100%; height: 100vh;">
    //             <source src="/resource/A.mov" type="video/mp4">
    //             Tu navegador no soporta videos HTML5.
    //         </video>
    //     </div>
    //     <div class="fondo_juego">            
    //         <button id="btn_mostrar_video" class="btn btn-primary">mostrar Video</button>
    //     </div>
    //     <div>
    //         <p>MACACO</p>
    //     </div>
    // </div>

})();
