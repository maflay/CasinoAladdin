(() => {
  // const btn_realizar_invi = document.getElementById("btn_realizar_invi");
  const view1 = document.getElementById("section_one");
  const view2 = document.getElementById("section_two");
  const check_acompañante = document.getElementById("acompañante");
  const check_acepto_terminos = document.getElementById(
    "check_acepto_terminos"
  );
  const btn_salida_segura = document.getElementById("salida_segura");

  const loader = document.getElementById("loading");

  const btn_agregar_invi_1 = document.getElementById("agregar_invi_1");
  const btn_quitar_invi_2 = document.getElementById("btn_quitar_invi_2");
  const btn_quitar_invi_3 = document.getElementById("btn_quitar_invi_3");
  const btn_quitar_invi_4 = document.getElementById("btn_quitar_invi_4");
  const btn_quitar_invi_5 = document.getElementById("btn_quitar_invi_5");

  //datos actualizar
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const fecha_nac = document.getElementById("fecha_nac");
  const direccion = document.getElementById("direccion");
  const contacto = document.getElementById("contacto");
  const correo = document.getElementById("correo");
  const cargo = document.getElementById("cargo");
  const local = document.getElementById("local");

  const btn_send_invi_form = document.getElementById("btn_send_invi_form");

  // datos invitado 1
  const nombre_inv_1 = document.getElementById("nombre_inv_1");
  const parentesco_invi_1 = document.getElementById("parentesco_invi_1");
  const tipo_documento_invi_1 = document.getElementById(
    "tipo_documento_invi_1"
  );
  const numero_docu_invi_1 = document.getElementById("numero_docu_invi_1");
  const pais_invi_1 = document.getElementById("pais_invi_1");
  const ciudad_invi_1 = document.getElementById("ciudad_invi_1");
  const fecha_invi_1 = document.getElementById("fecha_invi_1");
  const num_invi_1 = document.getElementById("num_invi_1");
  const desc_invi_1 = document.getElementById("desc_invi_1");

  // datos invitados 2
  const nombre_inv_2 = document.getElementById("nombre_inv_2");
  const parentesco_invi_2 = document.getElementById("parentesco_invi_2");
  const tipo_documento_invi_2 = document.getElementById(
    "tipo_documento_invi_2"
  );
  const numero_docu_invi_2 = document.getElementById("numero_docu_invi_2");
  const pais_invi_2 = document.getElementById("pais_invi_2");
  const ciudad_invi_2 = document.getElementById("ciudad_invi_2");
  const fecha_invi_2 = document.getElementById("fecha_invi_2");
  const num_invi_2 = document.getElementById("num_invi_2");
  const desc_invi_2 = document.getElementById("desc_invi_2");

  // datos invitados 3
  const nombre_inv_3 = document.getElementById("nombre_inv_3");
  const parentesco_invi_3 = document.getElementById("parentesco_invi_3");
  const tipo_documento_invi_3 = document.getElementById(
    "tipo_documento_invi_3"
  );
  const numero_docu_invi_3 = document.getElementById("numero_docu_invi_3");
  const pais_invi_3 = document.getElementById("pais_invi_3");
  const ciudad_invi_3 = document.getElementById("ciudad_invi_3");
  const fecha_invi_3 = document.getElementById("fecha_invi_3");
  const num_invi_3 = document.getElementById("num_invi_3");
  const desc_invi_3 = document.getElementById("desc_invi_3");

  // datos invitados 4
  const nombre_inv_4 = document.getElementById("nombre_inv_4");
  const parentesco_invi_4 = document.getElementById("parentesco_invi_4");
  const tipo_documento_invi_4 = document.getElementById(
    "tipo_documento_invi_4"
  );
  const numero_docu_invi_4 = document.getElementById("numero_docu_invi_4");
  const pais_invi_4 = document.getElementById("pais_invi_4");
  const ciudad_invi_4 = document.getElementById("ciudad_invi_4");
  const fecha_invi_4 = document.getElementById("fecha_invi_4");
  const num_invi_4 = document.getElementById("num_invi_4");
  const desc_invi_4 = document.getElementById("desc_invi_4");

  // datos invitados 5
  const nombre_inv_5 = document.getElementById("nombre_inv_5");
  const parentesco_invi_5 = document.getElementById("parentesco_invi_5");
  const tipo_documento_invi_5 = document.getElementById(
    "tipo_documento_invi_5"
  );
  const numero_docu_invi_5 = document.getElementById("numero_docu_invi_5");
  const pais_invi_5 = document.getElementById("pais_invi_5");
  const ciudad_invi_5 = document.getElementById("ciudad_invi_5");
  const fecha_invi_5 = document.getElementById("fecha_invi_5");
  const num_invi_5 = document.getElementById("num_invi_5");
  const desc_invi_5 = document.getElementById("desc_invi_5");

  const form_invi_1 = document.getElementById("form_invi_1");
  const form_invi_2 = document.getElementById("form_invi_2");
  const form_invi_3 = document.getElementById("form_invi_3");
  const form_invi_4 = document.getElementById("form_invi_4");
  const form_invi_5 = document.getElementById("form_invi_5");
  const content_btn_submit = document.getElementById("content_btn_submit");

  document.getElementById("si_voy").style.display = "none";

  const url =
    "https://script.google.com/macros/s/AKfycbzHvhVbDqWLKETTEeXgWDe8lStGSk1jtVt0tDH_GuFDFj4natKo2AesuSTY4QtGy2FPlw/exec";

  const url_post =
    "https://script.google.com/macros/s/AKfycbx-e9BYs4QeaEGHaShvBVoeeCI9Zv-MBGXa_PlJjmwFXJ6muSsofsLvx-8NpHro5gDs/exec";

  function setCookie(name, value, opts = {}) {
    const {
      hours = 1,
      path = "/",
      sameSite = "Lax",
      secure = location.protocol === "https:",
    } = opts;

    const expires = new Date(
      Date.now() + hours * 60 * 60 * 1000
    ).toUTCString();
    console.log(expires, "expires");
    const encoded = encodeURIComponent(JSON.stringify(value));
    let cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite}`;
    if (secure) cookie += `; Secure`;
    document.cookie = cookie;
  }

  function getCookie(name) {
    const parts = document.cookie ? document.cookie.split("; ") : [];
    for (const part of parts) {
      const [k, ...rest] = part.split("=");
      if (k === name) {
        const val = rest.join("=");
        try {
          return JSON.parse(decodeURIComponent(val));
        } catch {
          return decodeURIComponent(val);
        }
      }
    }
    return null;
  }

  validateSeccion();

  topItem();

  function topItem() {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }

  function validateSeccion() {
    const u = getCookie("user");
    if (u) {
      view1.style.display = "none";
      view2.style.display = "flex";
      view2.classList.remove("no_screen");
      window.scrollTo({
        top: 0,
        behavior: "smooth", // animado
      });
    } else if (!u) {
      view1.style.display = "block";
      view2.style.display = "none";
    }
  }

  btn_agregar_invi_1.addEventListener("click", () => {
    if (form_invi_1.style.display != "flex") {
      form_invi_1.style.display = "flex";
      content_btn_submit.style.display = "flex";
    } else if (form_invi_2.style.display != "flex") {
      form_invi_2.style.display = "flex";
      content_btn_submit.style.display = "flex";
    } else if (form_invi_3.style.display != "flex") {
      form_invi_3.style.display = "flex";
      content_btn_submit.style.display = "flex";
    } else if (form_invi_4.style.display != "flex") {
      form_invi_4.style.display = "flex";
      content_btn_submit.style.display = "flex";
    } else if (form_invi_5.style.display != "flex") {
      form_invi_5.style.display = "flex";
      content_btn_submit.style.display = "flex";
    } else {
      if (
        form_invi_1.style.display == "flex" &&
        form_invi_2.style.display == "flex" &&
        form_invi_3.style.display == "flex" &&
        form_invi_4.style.display == "flex" &&
        form_invi_5.style.display == "flex"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          html: "Ya ocupaste el máximo de cupos de invitados posibles.",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    }
  });

  btn_quitar_invi_2.addEventListener("click", () => {
    form_invi_2.style.display = "none";
    nombre_inv_2.value = "";
    parentesco_invi_2.value = "";
    tipo_documento_invi_2.value = "";
    numero_docu_invi_2.value = "";
    pais_invi_2.value = "";
    ciudad_invi_2.value = "";
    fecha_invi_2.value = "";
    num_invi_2.value = "";
    desc_invi_2.value = "";
  });

  btn_quitar_invi_3.addEventListener("click", () => {
    form_invi_3.style.display = "none";
    nombre_inv_3.value = "";
    parentesco_invi_3.value = "";
    tipo_documento_invi_3.value = "";
    numero_docu_invi_3.value = "";
    pais_invi_3.value = "";
    ciudad_invi_3.value = "";
    fecha_invi_3.value = "";
    num_invi_3.value = "";
    desc_invi_3.value = "";
  });

  btn_quitar_invi_4.addEventListener("click", () => {
    form_invi_4.style.display = "none";
    nombre_inv_4.value = "";
    parentesco_invi_4.value = "";
    tipo_documento_invi_4.value = "";
    numero_docu_invi_4.value = "";
    pais_invi_4.value = "";
    ciudad_invi_4.value = "";
    fecha_invi_4.value = "";
    num_invi_4.value = "";
    desc_invi_4.value = "";
  });

  btn_quitar_invi_5.addEventListener("click", () => {
    form_invi_5.style.display = "none";
    nombre_inv_5.value = "";
    parentesco_invi_5.value = "";
    tipo_documento_invi_5.value = "";
    numero_docu_invi_5.value = "";
    pais_invi_5.value = "";
    ciudad_invi_5.value = "";
    fecha_invi_5.value = "";
    num_invi_5.value = "";
    desc_invi_5.value = "";
  });

  check_acompañante.addEventListener("click", () => {
    if (check_acompañante.checked) {
      document.getElementById("si_voy").style.display = "block";
      document.getElementById("no_voy").style.display = "none";
    } else {
      document.getElementById("si_voy").style.display = "none";
      document.getElementById("no_voy").style.display = "block";
    }
  });

  // btn_realizar_invi.addEventListener("click", () => {
  //   validateindentity();
  // });

  const u = getCookie("user");
  if (!u) {
    validateindentity();
  }

  function validateindentity() {
    Swal.fire({
      title: "Digita tu usuario Aladdin.",
      html: `<div class="test_input">
      <input id="swal-user" name="user" class="swal2-input input_validate_xp" placeholder="Usuario" autocomplete="current-password">
              <input id="swal-pass" name="password" type="password" class="swal2-input input_validate_xp" placeholder="Contraseña" autocomplete="current-password">
      </div>
              `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Validar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const usuario = document.getElementById("swal-user").value.trim();
        const cedula = document.getElementById("swal-pass").value.trim();
        if (usuario == "" || cedula == "") {
          alert("Completa la información");
          validateindentity();
          return;
        } else {
          try {
            const githubUrl = `${url}?cedula=${cedula}`;
            const response = await fetch(githubUrl);
            if (!response.ok) {
              return Swal.showValidationMessage(
                `${JSON.stringify(await response.json())}`
              );
            }
            return response.json();
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        }
      },
      customClass: {
        popup: "mi-popup-xp",
        title: "mi-titulo-xp",
        confirmButton: "btn-Send-xp mi-boton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("entro en enviar");
        if (result.value != "") {
          setCookie("user", result.value[0].Cedula);
          //   view1.style.display = "none";
          //   view2.style.display = "flex";
          view2.classList.remove("no_screen");
          window.location.reload();
        } else if (result.value == "") {
          // view1.style.display = "block";
          // view2.style.display = "none";
          Swal.fire({
            icon: "info",
            title: "Usuario no Encontrado",
            html: "El Usuario digitado no se encuentra, por favor comunícate con el área de comunicaciones.",
            allowOutsideClick: false,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn-Send mi-boton",
            },
          }).then((res) => {
            if (res.isConfirmed) {
              validateindentity();
            }
          });
        }
      } else if (result.isDismissed) {
        navegarA("inicio");
      }
    });
  }

  btn_salida_segura.addEventListener("click", () => {
    OlivdarUsuario();
  });

  function OlivdarUsuario() {
    Swal.fire({
      title: "Seguro de salir?",
      text: "Tu sesión se cerrará",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si Quiero!",
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Exito!",
          text: "Tu sesión ha sido cerrada.",
          icon: "success",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            document.cookie = "user=; max-age=0; path=/;";
            window.scrollTo({
              top: 0,
            });
            location.reload();
          }
        });
      }
    });
  }

  btn_send_invi_form.addEventListener("click", () => {
    handleSendIniv();
  });

  function handleSendIniv() {
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

    const u = getCookie("user");

    // datos a actualiza
    let nombreV = nombre.value;
    let apellidoV = apellido.value;
    let fecha_nacV = fecha_nac.value;
    let direccionV = direccion.value;
    let contactoV = contacto.value;
    let correoV = correo.value;
    let cargoV = cargo.value;
    let localV = local.value;

    // datos invitado 1
    let nombreI1 = nombre_inv_1.value;
    let parentescoI1 = parentesco_invi_1.value;
    let tipoDocuI1 = tipo_documento_invi_1.value;
    let numeDocuI1 = numero_docu_invi_1.value;
    let paisI1 = pais_invi_1.value;
    let ciudadI1 = ciudad_invi_1.value;
    let fechaVisiI1 = fecha_invi_1.value;
    let numeInviI1 = num_invi_1.value;
    let descInviI1 = desc_invi_1.value;

    // datos invitado 2
    let nombreI2 = nombre_inv_2.value;
    let parentescoI2 = parentesco_invi_2.value;
    let tipoDocuI2 = tipo_documento_invi_2.value;
    let numeDocuI2 = numero_docu_invi_2.value;
    let paisI2 = pais_invi_2.value;
    let ciudadI2 = ciudad_invi_2.value;
    let fechaVisiI2 = fecha_invi_2.value;
    let numeInviI2 = num_invi_2.value;
    let descInviI2 = desc_invi_2.value;

    // datos invitado 3
    let nombreI3 = nombre_inv_3.value;
    let parentescoI3 = parentesco_invi_3.value;
    let tipoDocuI3 = tipo_documento_invi_3.value;
    let numeDocuI3 = numero_docu_invi_3.value;
    let paisI3 = pais_invi_3.value;
    let ciudadI3 = ciudad_invi_3.value;
    let fechaVisiI3 = fecha_invi_3.value;
    let numeInviI3 = num_invi_3.value;
    let descInviI3 = desc_invi_3.value;

    // datos invitado 4
    let nombreI4 = nombre_inv_4.value;
    let parentescoI4 = parentesco_invi_4.value;
    let tipoDocuI4 = tipo_documento_invi_4.value;
    let numeDocuI4 = numero_docu_invi_4.value;
    let paisI4 = pais_invi_4.value;
    let ciudadI4 = ciudad_invi_4.value;
    let fechaVisiI4 = fecha_invi_4.value;
    let numeInviI4 = num_invi_4.value;
    let descInviI4 = desc_invi_4.value;

    // datos invitado 5
    let nombreI5 = nombre_inv_5.value;
    let parentescoI5 = parentesco_invi_5.value;
    let tipoDocuI5 = tipo_documento_invi_5.value;
    let numeDocuI5 = numero_docu_invi_5.value;
    let paisI5 = pais_invi_5.value;
    let ciudadI5 = ciudad_invi_5.value;
    let fechaVisiI5 = fecha_invi_5.value;
    let numeInviI5 = num_invi_5.value;
    let descInviI5 = desc_invi_5.value;

    if (
      nombreV == "" ||
      apellidoV == "" ||
      fecha_nacV == "" ||
      direccionV == "" ||
      contactoV == "" ||
      correoV == "" ||
      cargoV == "" ||
      localV == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        html: "Completa todos los datos antes de enviar.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }

    if (form_invi_1.style.display == "flex") {
      if (
        nombreI1 == "" ||
        parentescoI1 == "" ||
        tipoDocuI1 == "" ||
        numeDocuI1 == "" ||
        paisI1 == "" ||
        ciudadI1 == "" ||
        fechaVisiI1 == "" ||
        numeInviI1 == "" ||
        descInviI1 == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          html: "Completa todos los datos antes de enviar.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    } else if (form_invi_2.style.display == "flex") {
      if (
        nombreI1 == "" ||
        parentescoI1 == "" ||
        tipoDocuI1 == "" ||
        numeDocuI1 == "" ||
        paisI1 == "" ||
        ciudadI1 == "" ||
        fechaVisiI1 == "" ||
        numeInviI1 == "" ||
        descInviI1 == "" ||
        nombreI2 == "" ||
        parentescoI2 == "" ||
        tipoDocuI2 == "" ||
        numeDocuI2 == "" ||
        paisI2 == "" ||
        ciudadI2 == "" ||
        fechaVisiI2 == "" ||
        numeInviI2 == "" ||
        descInviI2 == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          html: "Completa todos los datos antes de enviar.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    } else if (form_invi_3.style.display == "flex") {
      if (
        nombreI1 == "" ||
        parentescoI1 == "" ||
        tipoDocuI1 == "" ||
        numeDocuI1 == "" ||
        paisI1 == "" ||
        ciudadI1 == "" ||
        fechaVisiI1 == "" ||
        numeInviI1 == "" ||
        descInviI1 == "" ||
        nombreI2 == "" ||
        parentescoI2 == "" ||
        tipoDocuI2 == "" ||
        numeDocuI2 == "" ||
        paisI2 == "" ||
        ciudadI2 == "" ||
        fechaVisiI2 == "" ||
        numeInviI2 == "" ||
        descInviI2 == "" ||
        nombreI3 == "" ||
        parentescoI3 == "" ||
        tipoDocuI3 == "" ||
        numeDocuI3 == "" ||
        paisI3 == "" ||
        ciudadI3 == "" ||
        fechaVisiI3 == "" ||
        numeInviI3 == "" ||
        descInviI3 == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          html: "Completa todos los datos antes de enviar.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    } else if (form_invi_4.style.display == "flex") {
      if (
        nombreI1 == "" ||
        parentescoI1 == "" ||
        tipoDocuI1 == "" ||
        numeDocuI1 == "" ||
        paisI1 == "" ||
        ciudadI1 == "" ||
        fechaVisiI1 == "" ||
        numeInviI1 == "" ||
        descInviI1 == "" ||
        nombreI2 == "" ||
        parentescoI2 == "" ||
        tipoDocuI2 == "" ||
        numeDocuI2 == "" ||
        paisI2 == "" ||
        ciudadI2 == "" ||
        fechaVisiI2 == "" ||
        numeInviI2 == "" ||
        descInviI2 == "" ||
        nombreI3 == "" ||
        parentescoI3 == "" ||
        tipoDocuI3 == "" ||
        numeDocuI3 == "" ||
        paisI3 == "" ||
        ciudadI3 == "" ||
        fechaVisiI3 == "" ||
        numeInviI3 == "" ||
        descInviI3 == "" ||
        nombreI4 == "" ||
        parentescoI4 == "" ||
        tipoDocuI4 == "" ||
        numeDocuI4 == "" ||
        paisI4 == "" ||
        ciudadI4 == "" ||
        fechaVisiI4 == "" ||
        numeInviI4 == "" ||
        descInviI4 == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          html: "Completa todos los datos antes de enviar.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    } else if (form_invi_5.style.display == "flex") {
      if (
        nombreI1 == "" ||
        parentescoI1 == "" ||
        tipoDocuI1 == "" ||
        numeDocuI1 == "" ||
        paisI1 == "" ||
        ciudadI1 == "" ||
        fechaVisiI1 == "" ||
        numeInviI1 == "" ||
        descInviI1 == "" ||
        nombreI2 == "" ||
        parentescoI2 == "" ||
        tipoDocuI2 == "" ||
        numeDocuI2 == "" ||
        paisI2 == "" ||
        ciudadI2 == "" ||
        fechaVisiI2 == "" ||
        numeInviI2 == "" ||
        descInviI2 == "" ||
        nombreI3 == "" ||
        parentescoI3 == "" ||
        tipoDocuI3 == "" ||
        numeDocuI3 == "" ||
        paisI3 == "" ||
        ciudadI3 == "" ||
        fechaVisiI3 == "" ||
        numeInviI3 == "" ||
        descInviI3 == "" ||
        nombreI4 == "" ||
        parentescoI4 == "" ||
        tipoDocuI4 == "" ||
        numeDocuI4 == "" ||
        paisI4 == "" ||
        ciudadI4 == "" ||
        fechaVisiI4 == "" ||
        numeInviI4 == "" ||
        descInviI4 == "" ||
        nombreI5 == "" ||
        parentescoI5 == "" ||
        tipoDocuI5 == "" ||
        numeDocuI5 == "" ||
        paisI5 == "" ||
        ciudadI5 == "" ||
        fechaVisiI5 == "" ||
        numeInviI5 == "" ||
        descInviI5 == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          html: "Completa todos los datos antes de enviar.",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
        return;
      }
    }

    let data = {
      tipo: "registro",
      Hora: hora,
      Fecha: fecha,
      Acompanante: check_acompañante.checked == true ? "Si" : "No",
      Nombre: nombreV + " " + apellidoV,
      Cedula: u,
      Fecha_nac: fecha_nacV,
      Direccion: direccionV,
      Num_contacto: contactoV,
      Correo: correoV,
      Cargo: cargoV,
      Local: localV,
      Invitado_1: "invitado 1",
      Nombre_inv_1: nombreI1,
      Parentesco_inv_1: parentescoI1,
      Tipo_identificacion_inv_1: tipoDocuI1,
      Num_identificacion_inv_1: numeDocuI1,
      Pais_resi_inv_1: paisI1,
      Ciudad_resi_inv_1: ciudadI1,
      Fecha_visita_inv_1: fechaVisiI1,
      Num_contacto_inv_1: numeInviI1,
      descr_inv_1: descInviI1,
      Invitado_2:
        form_invi_2.style.display == "flex" ||
        form_invi_3.style.display == "flex" ||
        form_invi_4.style.display == "flex" ||
        form_invi_5.style.display == "flex"
          ? "Invitado 2"
          : "",
      Nombre_inv_2: nombreI2,
      Parentesco_inv_2: parentescoI2,
      Tipo_identificacion_inv_2: tipoDocuI2,
      Num_identificacion_inv_2: numeDocuI2,
      Pais_resi_inv_2: paisI2,
      Ciudad_resi_inv_2: ciudadI2,
      Fecha_visita_inv_2: fechaVisiI2,
      Num_contacto_inv_2: numeInviI2,
      descr_inv_2: descInviI2,
      Invitado_3:
        form_invi_3.style.display == "flex" ||
        form_invi_4.style.display == "flex" ||
        form_invi_5.style.display == "flex"
          ? "Invitado 3"
          : "",
      Nombre_inv_3: nombreI3,
      Parentesco_inv_3: parentescoI3,
      Tipo_identificacion_inv_3: tipoDocuI3,
      Num_identificacion_inv_3: numeDocuI3,
      Pais_resi_inv_3: paisI3,
      Ciudad_resi_inv_3: ciudadI3,
      Fecha_visita_inv_3: fechaVisiI3,
      Num_contacto_inv_3: numeInviI3,
      descr_inv_3: descInviI3,
      Invitado_4:
        form_invi_4.style.display == "flex" ||
        form_invi_5.style.display == "flex"
          ? "Invitado 3"
          : "",
      Nombre_inv_4: nombreI4,
      Parentesco_inv_4: parentescoI4,
      Tipo_identificacion_inv_4: tipoDocuI4,
      Num_identificacion_inv_4: numeDocuI4,
      Pais_resi_inv_4: paisI4,
      Ciudad_resi_inv_4: ciudadI4,
      Fecha_visita_inv_4: fechaVisiI4,
      Num_contacto_inv_4: numeInviI4,
      descr_inv_4: descInviI4,
      Invitado_5: form_invi_5.style.display == "flex" ? "Invitado 3" : "",
      Nombre_inv_5: nombreI5,
      Parentesco_inv_5: parentescoI5,
      Tipo_identificacion_inv_5: tipoDocuI5,
      Num_identificacion_inv_5: numeDocuI5,
      Pais_resi_inv_5: paisI5,
      Ciudad_resi_inv_5: ciudadI5,
      Fecha_visita_inv_5: fechaVisiI5,
      Num_contacto_inv_5: numeInviI5,
      descr_inv_5: descInviI5,
      Acepto_T_Y_C: check_acepto_terminos.checked == true ? "Si" : "No",
      Correo_enviar: "pruebajfdm@gmail.com",
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
    }).then((res) => {
      if (res.isConfirmed) {
        loader.style.display = "flex";
        fetch(url_post, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            loader.style.display = "none";
            Swal.fire({
              icon: "success",
              title: "Gracias por tu solicitud",
              html: "En máximo 72 horas recibirás respuesta de la aprobación de esta solicitud. Tu sesión se cerrará",
              allowOutsideClick: false,
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                confirmButton: "btn-Send mi-boton",
              },
            }).then((res) => {
              if (res.isConfirmed) {
                document.cookie = "user=; max-age=0; path=/;";
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            console.log(error);
            loader.style.display = "none";
            Swal.fire({
              icon: "error",
              title: "Error en el envió",
              allowOutsideClick: false,
              html: "Ha ocurrido un error en el envio de la solicitud, por favor intentalo mas tarde.",
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                confirmButton: "btn-Send mi-boton",
              },
            });
          });
      }
    });
  }
})();
