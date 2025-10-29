(() => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const tipo_documento = document.getElementById("tipo_documento");
  const num_documento = document.getElementById("num_documento");
  const fecha_nacimiento = document.getElementById("fecha_nacimiento");
  const correo_entrevista = document.getElementById("correo_entrevista");
  const ciudad_referencia = document.getElementById("ciudad_referencia");
  const tel_numero = document.getElementById("tel_numero");
  const cargo_aspira = document.getElementById("cargo_aspira");
  const ultimo_grado = document.getElementById("ultimo_grado");
  const institucion_entre = document.getElementById("institucion_entre");
  const titulo_obt = document.getElementById("titulo_obt");
  const cursos_obt = document.getElementById("cursos_obt");
  const ultimo_trabajo = document.getElementById("ultimo_trabajo");
  const funciones_ultimo_trabajo = document.getElementById(
    "funciones_ultimo_trabajo"
  );
  const tiempo_laborado = document.getElementById("tiempo_laborado");
  const motivo_ultimo_trabajo = document.getElementById(
    "motivo_ultimo_trabajo"
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
    "disponibilidad_inicio"
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
    "https://script.google.com/macros/s/AKfycby5F3BDXV7MoYQOacWU-cUIiTlIw_QJ84dwTzsQE1Ge6ZoIB6nRkqqb7XNKY7hqp2k/exec";

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result); // "data:image/png;base64,...."
      reader.readAsDataURL(file);
    });
  }

  const memoria_test_num = document.getElementById("memoria_test_num");
  const codigo = Math.floor(10000 + Math.random() * 90000);
  memoria_test_num.textContent = "Mostrar";
  memoria_test_num.style.cursor = "Pointer";

  memoria_test_num.addEventListener("click", () => {
    memoria_test_num.textContent = codigo;
    setTimeout(() => {
      memoria_test_num.textContent = "";
    }, 4500);
  });

  btn_send_entrevista.addEventListener("click", () => {
    const identidad = validateIndetidad();
    if (identidad > 40) {
      if (ultimo_grado.value == "Primaria") {
        loader.style.display = "flex";
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            title: "Gracias por tu Participación!",
            text: "Se reviso tu información y no cumples con unos requisitos.",
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
    } else {
      handleSubmit();
    }
  });

  function validateIndetidad() {
    const fechaValor = fecha_nacimiento.value;
    const ultimoGrado = ultimo_grado.value;
    if (fechaValor) {
      const fecha = new Date(fechaValor);
      const anio = fecha.getFullYear(); // Ej: 2002 (entero)

      // console.log("Año de nacimiento:", anio);

      // Ejemplo de operación (calcular edad)
      const anioActual = new Date().getFullYear();
      const edad = anioActual - anio;
      // console.log("Edad:", edad);
      return edad;
    }
  }

  async function handleSubmit() {
    validateIndetidad();
    let val_correo = "";
    if (ciudad_referencia.value == "cali") {
      // val_correo = "seleccion@vivealaddin.com";
      val_correo = "pruebajfdm@gmail.com";
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
    let ultimo_trabajo_val = ultimo_trabajo.value;
    let funciones_ultimo_trabajo_val = funciones_ultimo_trabajo.value;
    let tiempo_laborado_val = tiempo_laborado.value;
    let motivo_ultimo_trabajo_val = motivo_ultimo_trabajo.value;
    let exp_considerada_val = exp_considerada.value;
    let experiencia_considerada_val = experiencia_considerada.value;
    let aspecto_mejorar_val = aspecto_mejorar.value;
    let uso_herramientas_val = uso_herramientas.value;
    let menejo_presion_val = menejo_presion.value;
    let trabajo_en_equipo_val = trabajo_en_equipo.value;
    let motivo_postulacion_val = motivo_postulacion.value;
    let logro_profesional_val = logro_profesional.value;
    let saber_de_la_empresa_val = saber_de_la_empresa.value;
    let diferencia_otros_val = diferencia_otros.value;
    let actual_empleo_val = actual_empleo.value;
    let disponibilidad_inicio_val = disponibilidad_inicio.value;
    let aspiracion_salarial_val = aspiracion_salarial.value;
    let trabajar_fines_val = trabajar_fines.value;
    let disponible_traslado_val = disponible_traslado.value;
    let comentario_adicional_val = comentario_adicional.value;
    let autorizo_entre_val = autorizo_entre.checked;
    let logica_test_val = logica_test.value;
    let memoria_test_val = memoria_test.value;
    let razonamiento_test_val = razonamiento_test.value;
    let matematica_test_val = matematica_test.value;
    let compresion_test_val = compresion_test.value;
    let observacion_test_val = observacion_test.value;
    let patron_test_val = patron_test.value;

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
      ultimo_trabajo_val == "" ||
      experiencia_considerada_val == "" || //Fortalezas
      aspecto_mejorar_val == "" ||
      motivo_postulacion_val == "" ||
      saber_de_la_empresa_val == "" ||
      actual_empleo_val == "" ||
      disponibilidad_inicio_val == "" ||
      trabajar_fines_val == "" ||
      disponible_traslado_val == "" ||
      autorizo_entre_val == false ||
      !foto_entre_val ||
      logica_test_val == "" || //inico test
      memoria_test_val == "" ||
      razonamiento_test_val == "" ||
      matematica_test_val == "" ||
      compresion_test_val == "" ||
      observacion_test_val == "" ||
      patron_test_val == ""
    ) {
      Swal.fire({
        title: "Antes de Enviar!",
        text: "Por favor completa todos los campos obligatorios.",
        icon: "warning",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }

    const base64 = await fileToDataURL(foto_entre_val);

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
      valor_38: logica_test_val == "2" ? logica_test_val+" - Correcto" : logica_test_val+ " - Incorrecto",
      valor_39: memoria_test_val == memoria_test_num.textContent ? memoria_test_val+" - Correcto" : memoria_test_val+" - Incorrecto" ,
      valor_40: razonamiento_test_val == "2" ? razonamiento_test_val+" - Correcto" : razonamiento_test_val+" - Incorrecto",
      valor_41: matematica_test_val == "3" ? matematica_test_val+" - Correcto" : matematica_test_val+" - Incorrecto",
      valor_42: compresion_test_val == "3" ? compresion_test_val+"- Correcto" : compresion_test_val+" - Incorrecto",
      valor_43: observacion_test_val == "3" ? observacion_test_val+" - Correcto" : observacion_test_val+" - Incorrecto",
      valor_44: patron_test_val == "2" ? patron_test_val+" - Correcto" : patron_test_val+" - Incorrecto",
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
              'input[type="text"], select, date, file, checkbox'
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
})();
