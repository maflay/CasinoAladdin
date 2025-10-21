(() => {
  const board_dealer = document.getElementById("board_dealer");
  const score_dealer = document.getElementById("score_dealer");
  const board_player = document.getElementById("board_player");
  const score_player = document.getElementById("score_player");

  const mensaje_apuesta = document.getElementById("mensaje_apuesta");

  const _cupo = document.getElementById("_cupo");
  const _apuesta = document.getElementById("_apuesta");

  const msj_reiniciar = document.getElementById("msj_reiniciar");
  msj_reiniciar.style.display = "none";

  const content_fichas = document.getElementById("content_fichas");

  let cupo = 1000000;
  let apuesta = 0;
  const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  _cupo.textContent = formatoPesos_monto_efectivo.format(cupo);
  _apuesta.textContent = apuesta;

  const ficha_10 = document.getElementById("ficha_10");
  const ficha_25 = document.getElementById("ficha_25");
  const ficha_50 = document.getElementById("ficha_50");
  const ficha_100 = document.getElementById("ficha_100");
  const ficha_250 = document.getElementById("ficha_250");

  const ficha_10_menos = document.getElementById("ficha_10_menos");
  const ficha_25_menos = document.getElementById("ficha_25_menos");
  const ficha_50_menos = document.getElementById("ficha_50_menos");
  const ficha_100_menos = document.getElementById("ficha_100_menos");
  const ficha_250_menos = document.getElementById("ficha_250_menos");

  const btn_apostar_blackjack = document.getElementById("apostar_blackjack");
  const btn_sacar_carta_blackjack = document.getElementById(
    "sacar_carta_blackjack"
  );

  const btn_plantarse_blackjack = document.getElementById(
    "plantarse_blackjack"
  );
  const btn_reset = document.getElementById("reset");

  btn_sacar_carta_blackjack.classList.add("btn_disable");
  msj_reiniciar.style.display = "none";
  btn_reset.classList.add("btn_disable");
  btn_plantarse_blackjack.classList.add("btn_disable");
  // --- Crear mazo completo ---
  const palos = ["C", "D", "H", "S"];
  const numeros = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  function crearMazo(numBarajas = 1) {
    const m = [];
    for (let d = 0; d < numBarajas; d++) {
      for (const p of palos) for (const n of numeros) m.push(`${n}${p}`);
    }
    return m;
  }

  // --- Barajar el mazo (algoritmo Fisher-Yates) ---
  function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let mazo = barajar(crearMazo(1));
  const UMBRAL_RECORTE = 15;

  // --- Función para sacar carta sin repetir ---
  function sacarCarta() {
    if (mazo.length === 0) return null;
    return mazo.pop(); // extrae y elimina la última carta
  }

  function prepararSiguienteRonda() {
    if (mazo.length < UMBRAL_RECORTE) {
      mazo = barajar(crearMazo(1));
    }
  }

  // --- Mostrar una carta en el tablero ---
  function mostrarCarta(contenedor, carta, oculta = false) {
    const img = document.createElement("img");
    img.src = oculta
      ? "/resources/cartas/back.png" // reverso
      : `/resources/cartas/${carta}.svg`; // carta real
    img.className = oculta ? "card back" : "card front";
    img.title = `${carta}`;
    img.id = carta.slice(0, -1);

    // Añadimos primero al contenedor para que el navegador calcule su posición final
    contenedor.appendChild(img);

    // --- Animación: la carta "vuela" desde el mazo ---
    const mazo = document.querySelector(".content_mazo img");
    const tablero = document.querySelector(".board_blackjack");

    if (mazo && tablero) {
      // Rectángulos relativos al viewport
      const rectMazo = mazo.getBoundingClientRect();
      const rectCard = img.getBoundingClientRect();
      const rectTablero = tablero.getBoundingClientRect();

      // Coordenadas del centro del mazo y de la carta (relativas al tablero)
      const mazoX = rectMazo.left + rectMazo.width / 2 - rectTablero.left;
      const mazoY = rectMazo.top + rectMazo.height / 2 - rectTablero.top;
      const cartaX = rectCard.left + rectCard.width / 2 - rectTablero.left;
      const cartaY = rectCard.top + rectCard.height / 2 - rectTablero.top;

      // Diferencia para el desplazamiento inicial
      const dx = mazoX - cartaX;
      const dy = mazoY - cartaY;

      console.log(dy, "prueba de coordenadas");
      console.log(dx, "prueba de coordenadas");
      // Posición inicial: justo donde está el mazo
      img.style.transform = `translate(${dx}px, ${dy}px) rotate(-10deg) scale(0.9)`;
      img.style.opacity = "0";

      // Forzamos el siguiente frame para activar la transición hacia su posición real
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          img.classList.add("show"); // usa tus reglas CSS .card.show
          img.style.transform = ""; // vuelve a posición final (0,0)
          img.style.opacity = "";
        });
      });
    } else {
      // Si no hay mazo, solo aparece suavemente
      setTimeout(() => img.classList.add("show"), 50);
    }

    return img;
  }

  // ======== Estado de la partida ========
  let manoPlayer = [];
  let manoDealer = [];
  let dealerOculta = null; // guarda la carta oculta mientras no se revele

  // ======== Helpers de puntaje ========

  // Devuelve el valor base de una carta sin considerar ases como 1/11.
  // "10H" -> 10, "JH" -> 10, "AD" -> 11 (luego ajustamos ases).
  function valorCarta(carta) {
    const rank = carta.slice(0, -1); // todo menos el último char (palo)
    if (rank === "A") return 11;
    if (["K", "Q", "J"].includes(rank)) return 10;
    return Number(rank); // "2".."10"
  }

  // Suma total de una mano ajustando ases (A=11 u 1) para no pasar de 21.
  function totalMano(mano) {
    let total = 0;
    let ases = 0;

    for (const c of mano) {
      const rank = c.slice(0, -1);
      if (rank === "A") ases++;
      total += valorCarta(c);
    }

    // Ajuste: convierte ases de 11 -> 1 mientras te pases de 21
    while (total > 21 && ases > 0) {
      total -= 10; // bajar un As de 11 a 1
      ases--;
    }
    return total;
  }

  // ======== UI: actualizar marcadores ========
  // showHole = false: el dealer muestra solo la carta visible (suma parcial).
  // showHole = true: el dealer muestra su total real (tras revelar).
  function actualizarPuntajes({ showHole = false } = {}) {
    const totalPlayer = totalMano(manoPlayer);
    let totalDealer;

    if (showHole || !dealerOculta) {
      // dealer sin oculta o ya revelada => total real
      totalDealer = totalMano(manoDealer);
    } else {
      // mostrar solo la visible (manoDealer con la oculta retirada)
      const visibles = manoDealer.filter((c) => c !== dealerOculta);
      totalDealer = totalMano(visibles);
    }

    score_player.textContent = totalPlayer;
    score_dealer.textContent = totalDealer;
  }

  // ======== Reparto con estado/puntaje ========

  // Reparte carta al contenedor y guarda en mano[].
  function repartirA(contenedor, mano, { oculta = false } = {}) {
    const carta = sacarCarta();
    if (!carta) return null;
    mano.push(carta);
    const el = mostrarCarta(contenedor, carta, oculta);
    return { carta, el };
  }

  // Al iniciar/apostar: resetea estado, reparte inicial y puntajes
  btn_apostar_blackjack.addEventListener("click", () => {
    if (apuesta <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Paso requerido",
        text: "Primero haz una apuesta.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
    content_fichas.classList.add("btn_disable");
    content_fichas_menos.classList.add("btn_disable");
    btn_sacar_carta_blackjack.classList.remove("btn_disable");
    btn_reset.classList.remove("btn_disable");
    btn_plantarse_blackjack.classList.remove("btn_disable");
    btn_apostar_blackjack.classList.add("btn_disable");

    // Reset visual
    board_player.innerHTML = "";
    board_dealer.innerHTML = "";

    prepararSiguienteRonda();

    // Reset estado
    manoPlayer = [];
    manoDealer = [];
    dealerOculta = null;
    window.holeCard = null; // <- NUEVO

    // Player: 2 visibles
    repartirA(board_player, manoPlayer);
    repartirA(board_player, manoPlayer);

    // Dealer: 1 visible + 1 oculta
    repartirA(board_dealer, manoDealer); // visible
    const hole = repartirA(board_dealer, manoDealer, { oculta: true }); // {carta, el}
    dealerOculta = hole.carta; // para el cálculo de score parcial
    window.holeCard = hole; // { carta, el } para poder voltearla

    actualizarPuntajes({ showHole: false });
    checkEstadosIniciales();
  });

  // Hit (sacar carta jugador)
  btn_sacar_carta_blackjack.addEventListener("click", () => {
    Swal.fire({
      title: "Estas  seguro?",
      text: "Puede pasarte estas seguro de sacar una nueva carta!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si quiero!",
       customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          const carta = repartirA(board_player, manoPlayer);
          if (!carta) return;
          
          actualizarPuntajes({ showHole: false });
          const total = totalMano(manoPlayer);
          if (total > 21 || total === 21) {
            // finDeRonda({ razon: "player_bust" });
            // validatePlantarse();
            decidirGanador();
          }
        }, 100);
      }
    });
  });

  // Stand (plantarse): revelar y dealer roba hasta 17
  btn_plantarse_blackjack.addEventListener("click", () => {
    validatePlantarse();
  });

  function validatePlantarse() {
    revelarCartaOcultaDealer().then(() => {
      turnoDealer().then(() => {
        decidirGanador();
      });
    });
  }

  // ======== Lógica de dealer ========

  // Revela la carta oculta visualmente y actualiza score
  function revelarCartaOcultaDealer() {
    return new Promise((resolve) => {
      const hole = window.holeCard;
      if (!hole) {
        actualizarPuntajes({ showHole: true });
        resolve();
        return;
      }

      // Animación opcional
      hole.el.classList.add("volteando");
      setTimeout(() => {
        hole.el.src = `/resources/cartas/${hole.carta}.svg`;
        hole.el.classList.remove("back", "volteando");
        hole.el.classList.add("front", "show");

        // limpiar refs
        window.holeCard = null;
        dealerOculta = null;

        actualizarPuntajes({ showHole: true });
        resolve();
      }, 400);
    });
  }

  // Dealer roba hasta mínimo 17 (configura si el crupier se planta en soft 17)
  const DEALER_PLANTA_SOFT_17 = true;

  function turnoDealer() {
    return new Promise((resolve) => {
      const robar = () => {
        const total = totalMano(manoDealer);

        // ¿Plantarse?
        const tieneAsComo11 =
          total <= 21 &&
          manoDealer.some((c) => c.slice(0, -1) === "A") &&
          total === 17;
        const soft17 = tieneAsComo11 && total === 17;

        // Plantarse en 17 o más. Si soft-17 y la regla dice plantarse, también se planta.
        if (
          total > 17 ||
          (total === 17 && (DEALER_PLANTA_SOFT_17 || !soft17))
        ) {
          actualizarPuntajes({ showHole: true });
          return resolve();
        }

        // Si está por debajo de 17 (o soft17 y la regla es hit), roba una y repite con un pequeño delay
        if (total < 17 || (soft17 && !DEALER_PLANTA_SOFT_17)) {
          const carta = repartirA(board_dealer, manoDealer);
          actualizarPuntajes({ showHole: true });

          // Si se pasó, fin
          if (totalMano(manoDealer) > 21) {
            return resolve();
          }

          setTimeout(robar, 500); // pequeño delay para ver las cartas llegar
        }
      };

      robar();
    });
  }

  // ======== Resoluciones / mensajes ========

  function checkEstadosIniciales() {
    const p = totalMano(manoPlayer);
    const dVisible = totalMano(manoDealer.filter((c) => c !== dealerOculta));

    // Si jugador tiene blackjack natural
    if (p === 21) {
      // Opcional: si quieres esperar a ver si dealer también tiene BJ, revela:
      revelarCartaOcultaDealer().then(decidirGanador);
      // decidirGanador();

      // validatePlantarse();
    }
  }

  function decidirGanador() {
    const totalP = totalMano(manoPlayer);
    const totalD = totalMano(manoDealer);

    let test_img = board_player.querySelectorAll("img").length;

    if (totalP === 21 && test_img == 2) {
      if (totalP > totalD)
        return finDeRonda("BlackJack", "Sacaste BlackJack", apuesta);
    } else if (totalP > totalD && totalP === 21)
      return finDeRonda(
        "Ganaste",
        "Le Ganaste al Dealer con BlackJack",
        apuesta
      );

    if (totalP > 21) return finDeRonda("Perdiste", "Superior a 21, ", apuesta);
    if (totalD > 21) return finDeRonda("Ganaste", "El Dealer se paso, ", apuesta);
    if (totalP > totalD)
      return finDeRonda("Ganaste", "Tienes mejores cartas, ", apuesta);
    if (totalP < totalD)
      return finDeRonda("Perdiste", "El Dealer Tiene mejores cartas, ", apuesta);
    return finDeRonda("Empate", "Esto fue empate, ", apuesta);
  }

  function finDeRonda(razon, mensaje, valorApuesta) {
    // pagar
    if (razon === "BlackJack") {
      cupo += valorApuesta * 2.5; // cobras 3:2
      apuesta = 0;
    } else if (razon === "Ganaste") {
      cupo += valorApuesta * 2; // cobras 1:1 (recuperas apuesta + ganancia)
      apuesta = 0;
    } else if (razon === "Empate") {
      cupo += valorApuesta; // te devuelven la apuesta
      apuesta = 0;
    } else if (razon === "Perdiste") {
      // ya la apuesta salió de cupo cuando la colocaste
      apuesta = 0;
    }

    // UI dinero
    _cupo.textContent = formatoPesos_monto_efectivo.format(cupo);
    _apuesta.textContent = formatoPesos_monto_efectivo.format(apuesta);

    // Mensaje
    Swal.fire({
      icon: "info",
      title: razon,
      text:
        mensaje +
        " con una apuesta de " +
        formatoPesos_monto_efectivo.format(valorApuesta),
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    }).then((res) => {
      if (res.isConfirmed) {
        revelarCartaOcultaDealer();
      }
      // rebarajar entre rondas si hace falta
      prepararSiguienteRonda();
      // reset mesa, habilitar fichas y apostar de nuevo
      // reset();
    });

    // desactivar juego hasta confirmar
    btn_apostar_blackjack.classList.add("btn_disable");
    btn_sacar_carta_blackjack.classList.add("btn_disable");
    msj_reiniciar.style.display = "flex";
    btn_plantarse_blackjack.classList.add("btn_disable");
  }

  const content_fichas_menos = document.getElementById("content_fichas_menos"); // fichas apostadas

  const fmt = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  _cupo.textContent = fmt.format(cupo);
  _apuesta.textContent = fmt.format(apuesta);

  // 1) Click en una ficha base => clonar y agregar a "apuestas"
  content_fichas.addEventListener("click", (e) => {
    const ficha = e.target.closest("img[data-valor]");
    if (!ficha) return;

    const valor = Number(ficha.dataset.valor);
    if (valor > cupo) {
      Swal.fire({
        icon: "warning",
        title: "Sin cupo",
        text: "No tienes fondos suficientes.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }

    // Descuenta y muestra
    cupo -= valor;
    apuesta += valor;
    _cupo.textContent = fmt.format(cupo);
    _apuesta.textContent = fmt.format(apuesta);

    // Crea la ficha clonada en la zona "menos"
    const clon = document.createElement("img");
    clon.src = ficha.src;
    clon.alt = ficha.alt || ficha.title || "ficha";
    clon.className = "ficha-apostada";
    clon.dataset.valor = String(valor); // guarda su valor aquí
    clon.dataset.uid = crypto.randomUUID(); // id único si lo necesitas

    content_fichas_menos.appendChild(clon);
  });

  // 2) Delegación: click en una ficha apostada => quitarla y devolver $
  content_fichas_menos.addEventListener("click", (e) => {
    const fichaApostada = e.target.closest("img.ficha-apostada");
    if (!fichaApostada) return;

    const valor = Number(fichaApostada.dataset.valor) || 0;

    // Elimina del DOM
    fichaApostada.remove();

    // Devuelve y actualiza
    cupo += valor;
    apuesta -= valor;
    _cupo.textContent = fmt.format(cupo);
    _apuesta.textContent = fmt.format(apuesta);
  });

  document.getElementById("reset").addEventListener("click", () => {
    reset();
  });

  function reset() {
    board_player.innerHTML = "";
    board_dealer.innerHTML = "";
    score_dealer.textContent = 0;
    score_player.textContent = 0;
    content_fichas_menos.innerHTML = "";

    btn_apostar_blackjack.classList.remove("btn_disable");
    btn_sacar_carta_blackjack.classList.add("btn_disable");
    btn_reset.classList.add("btn_disable");
    btn_plantarse_blackjack.classList.add("btn_disable");
    content_fichas.classList.remove("btn_disable");
    btn_apostar_blackjack.classList.remove("btn_disable");
    content_fichas_menos.classList.remove("btn_disable");
    msj_reiniciar.style.display = "none";

    // limpia estado de mano/dealer
    manoPlayer = [];
    manoDealer = [];
    dealerOculta = null;
    window.holeCard = null;
  }
})();

function abrirModal() {
  document.getElementById("modal_reglas_blackjack").style.display = "flex";
  lockBodyScroll();
}

function cerrarModal() {
  document.getElementById("modal_reglas_blackjack").style.display = "none";
  unlockBodyScroll();
}

let _scrollY = 0;

function lockBodyScroll() {
  _scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add("body-lock");
}

function unlockBodyScroll() {
  document.body.classList.remove("body-lock");
  document.body.style.top = "";
  window.scrollTo(0, _scrollY);
}

function startGame() {
  document.getElementById("view_pre").style.display = "none";
  document.getElementById("content_game_all").style.display = "block";
}
