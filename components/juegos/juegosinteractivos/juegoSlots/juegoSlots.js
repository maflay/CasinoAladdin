(() => {
  // const symbols = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  const symbols = ["bar.png", "cereza.png", "lampara.png", "limon.png"];
  const longObj = symbols.length;

  const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const btn_start_game = document.getElementById("btn_start_game");

  btn_start_game.addEventListener("click", () => {
    document.getElementById("view_pre").style.display = "none";
    document.getElementById("content_game_all").style.display = "flex";
  });

  const ficha_10 = document.getElementById("ficha_10");
  const ficha_25 = document.getElementById("ficha_25");
  const ficha_50 = document.getElementById("ficha_50");
  const ficha_100 = document.getElementById("ficha_100");
  const ficha_250 = document.getElementById("ficha_250");

  const saldoV = document.getElementById("saldo");
  const apuestaV = document.getElementById("apuesta");

  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
  ];

  let saldo = 1000000;
  let apuesta = 0;

  saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
  apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);

  ficha_10.addEventListener("click", () => {
    let valFicha = ficha_10.dataset.valor;
    if (saldo < valFicha) {
      Swal.fire({
        icon: "warning",
        title: "Sin saldo para esta apuesta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    saldo -= valFicha;
    apuesta += Number(valFicha);
    saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
    apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
  });

  ficha_25.addEventListener("click", () => {
    let valFicha = ficha_25.dataset.valor;
    if (saldo < valFicha) {
      Swal.fire({
        icon: "warning",
        title: "Sin saldo para esta apuesta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    saldo -= valFicha;
    apuesta += Number(valFicha);
    saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
    apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
  });

  ficha_50.addEventListener("click", () => {
    let valFicha = ficha_50.dataset.valor;
    if (saldo < valFicha) {
      Swal.fire({
        icon: "warning",
        title: "Sin saldo para esta apuesta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    saldo -= valFicha;
    apuesta += Number(valFicha);
    saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
    apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
  });

  ficha_100.addEventListener("click", () => {
    let valFicha = ficha_100.dataset.valor;
    if (saldo < valFicha) {
      Swal.fire({
        icon: "warning",
        title: "Sin saldo para esta apuesta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    saldo -= valFicha;
    apuesta += Number(valFicha);
    saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
    apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
  });

  ficha_250.addEventListener("click", () => {
    let valFicha = ficha_250.dataset.valor;
    if (saldo < valFicha) {
      Swal.fire({
        icon: "warning",
        title: "Sin saldo para esta apuesta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    saldo -= valFicha;
    apuesta += Number(valFicha);
    saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
    apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
  });

  function mostrarFrutasIniciales() {
    reels.forEach((reel) => {
      const fruta = getRandomSymbol();
      const img = document.createElement("img");
      img.src = "/resources/slots/" + fruta;
      img.style.width = "100%";
      img.style.height = "100%";
      reel.innerHTML = "";
      reel.appendChild(img);
    });
  }

  mostrarFrutasIniciales();

  const message = document.getElementById("message");
  const spinBtn = document.getElementById("spinBtn");

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * longObj)];
  }

  function spinReel(reel, opts = {}, callback) {
    const {
      spins = 10, // cantidad de GIROS (vueltas) editables
      duration = 1400, // duración del giro en ms
      easing = "cubic-bezier(.12,.72,.2,1)",
    } = opts;

    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }

    // Garantiza callback válido
    if (typeof callback !== "function") callback = () => {};

    reel.innerHTML = "";

    const track = document.createElement("div");
    track.classList.add("spin-track");

    // Alto de 1 símbolo = alto del reel (en tu CSS es 200px)
    const H = reel.clientHeight || 200;

    // Creamos un track largo: spins * cantidadSímbolos + buffer
    const totalItems = spins * longObj + longObj;

    // Llenar el track con imágenes random
    for (let i = 0; i < totalItems; i++) {
      const img = document.createElement("img");
      const symbol = getRandomSymbol();
      img.src = "/resources/slots/" + symbol;
      img.style.width = "100%";
      img.style.height = `${H}px`; // clave: cada imagen mide 1 "paso"
      img.style.objectFit = "contain";
      track.appendChild(img);
    }

    // Símbolo final (el resultado real)
    const lastSymbol = getRandomSymbol();
    const finalImg = document.createElement("img");
    finalImg.src = "/resources/slots/" + lastSymbol;
    finalImg.style.width = "100%";
    finalImg.style.height = `${H}px`;
    finalImg.style.objectFit = "contain";
    track.appendChild(finalImg);

    reel.appendChild(track);

    // Posición final para que quede el último símbolo visible
    const finalIndex = totalItems; // el último que agregamos
    const toY = -finalIndex * H;

    // Reset
    track.style.transform = "translateY(0px)";
    track.style.transition = "none";
    track.getBoundingClientRect(); // force reflow

    // Animar
    track.style.transition = `transform ${duration}ms ${easing}`;
    track.style.transform = `translateY(${toY}px)`;

    // Cuando termina
    const onEnd = () => {
      track.removeEventListener("transitionend", onEnd);

      // dejar fijo solo el símbolo final (como haces hoy)
      reel.innerHTML = "";
      const img = document.createElement("img");
      img.src = "/resources/slots/" + lastSymbol;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      reel.appendChild(img);

      callback("/" + lastSymbol);
    };

    track.addEventListener("transitionend", onEnd);
  }

  function spinAllReels() {
    message.textContent = "";

    let results = [];

    spinReel(reels[0], {}, (res1) => {
      results[0] = res1;
      spinReel(reels[1], {}, (res2) => {
        results[1] = res2;
        spinReel(reels[2], {}, (res3) => {
          results[2] = res3;
          checkResult(results);
        });
      });
    });
  }

  function checkResult([a, b, c]) {
    const imgA = a.split("/").pop();
    const imgB = b.split("/").pop();
    const imgC = c.split("/").pop();

    if (imgA === imgB && imgB === imgC) {
      Swal.fire({
        title: "🎉 ¡Ganaste!",
        text: "Combinacion exitosa",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      message.textContent = "🎉 ¡Ganaste!";
      spinBtn.classList.remove("palanca_accionada");
      document.querySelector(".control_coins").classList.remove("item_disable");
      message.style.color = "lime";

      let valFilter1 = imgA.substring(0, imgA.lastIndexOf("."));
      let valFilter2 = imgB.substring(0, imgB.lastIndexOf("."));
      let valFilter3 = imgB.substring(0, imgC.lastIndexOf("."));
      calculoApuesta(valFilter1, valFilter2, valFilter3);
    } else {
      Swal.fire({
        title: "Sigue Intentando!",
        text: "😢 Inténtalo de nuevo",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      apuesta = 0;
      apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
      spinBtn.classList.remove("palanca_accionada");
      document.querySelector(".control_coins").classList.remove("item_disable");
      message.textContent = "😢 Inténtalo de nuevo";
      message.style.color = "white";
    }
  }

  spinBtn.addEventListener("click", () => {
    if (apuesta == 0) {
      Swal.fire({
        icon: "warning",
        title: "Realiza una apuesta primero",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    spinBtn.classList.add("palanca_accionada");
    document.querySelector(".control_coins").classList.add("item_disable");
    spinAllReels();
  });

  function calculoApuesta(val1, val2, val3) {
    let fichaBar = symbols[0].split(".")[0];
    let fichaCereza = symbols[1].split(".")[0];
    let fichaLampara = symbols[2].split(".")[0];
    let fichaLimon = symbols[3].split(".")[0];

    if (val1 == fichaBar && val2 == fichaBar && val3 == fichaBar) {
      saldo += apuesta * 2.5;
      apuesta = 0;
      saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
      apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
    }

    if (val1 == fichaLampara && val2 == fichaLampara && val3 == fichaLampara) {
      saldo += apuesta * 2;
      apuesta = 0;
      saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
      apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
    }

    if (val1 == fichaCereza && val2 == fichaCereza && val3 == fichaCereza) {
      saldo += apuesta * 1.2;
      apuesta = 0;
      saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
      apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
    }

    if (val1 == fichaLimon && val2 == fichaLimon && val3 == fichaLimon) {
      saldo += apuesta * 1.2;
      apuesta = 0;
      saldoV.textContent = formatoPesos_monto_efectivo.format(saldo);
      apuestaV.textContent = formatoPesos_monto_efectivo.format(apuesta);
    }
  }
})();
