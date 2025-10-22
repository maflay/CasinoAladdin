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
  const experiencia_considerada = document.getElementById(
    "fortalezas"
  );
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

  let formulario = document.getElementById('content_main_e_digital');
  const url =
    "https://script.google.com/macros/s/AKfycbyvPNBagTzfTGHVoza5QFStxdmZiiBJxga7q-NkRvc8KE0vcxCjNEUoIspqgvgp0uxZ/exec";

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result); // "data:image/png;base64,...."
      reader.readAsDataURL(file);
    });
  }

  btn_send_entrevista.addEventListener("click", () => {
    handleSubmit();
  });

  async function handleSubmit() {
    let val_correo="";
    if(ciudad_referencia.value == "cali"){
      // val_correo = "seleccion@vivealaddin.com";
      val_correo = "pruebajfdm@gmail.com";
    } else if(ciudad_referencia.value == "bogota"){
      val_correo = "bog_auxnomina@vivealaddin.com";
    } else if(ciudad_referencia.value == "barranquilla"){
      val_correo = "baq_operativo@vivealaddin.com";
    } else if(ciudad_referencia.value == "pereira"){
      val_correo = "per_asisadtvo@vivealaddin.com";
    } else if(ciudad_referencia.value == "tulua"){
      val_correo = "dir.a09@vivealaddin.com";
    } else if(ciudad_referencia.value == "buga"){
      val_correo = "dir.A38@vivealaddin.com";
    } else if(ciudad_referencia.value == "monteria"){
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
      valor_37: val_correo
    };

    console.log(data);

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

            inputs.forEach((input) => {
              input.value = "";
            });
            loader.style.display= "none";
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
          }).catch((error ) => {
            console.log("No creo el registro");
          });
      }
    });
  }
})();
