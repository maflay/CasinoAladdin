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
  const btn_doblar_blackjack = document.getElementById("doblar_blackjack");
  const btn_dividir_blackjack = document.getElementById("dividir_blackjack");

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
    img.id = `carta_${carta.slice(0, -1)}`;

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

      // console.log(dy, "prueba de coordenadas");
      // console.log(dx, "prueba de coordenadas");
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
  let manoPlayer2 = [];
  const score2 = document.getElementById("score_player2");

  let manoDealer = [];
  let dealerOculta = null; // guarda la carta oculta mientras no se revele
  let playerHands = []; // e.g., [mano1, mano2]
  let playerBoards = []; // e.g., [board_player, board_player2]
  let bets = []; // apuesta por mano (COP)
  let currentHand = 0; // índice de la mano activa
  let splitActive = false;

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

  function esParParaSplit(mano) {
    if (mano.length !== 2) return false;
    const r1 = mano[0].slice(0, -1);
    const r2 = mano[1].slice(0, -1);
    // misma “figura”: A/A, 8/8, K/K... (puedes cambiar a igualdad por valor 10 para JQK)
    return r1 === r2;
  }

  function puedeDividir() {
    console.log(playerHands[0]);
    return (
      !splitActive && playerHands.length === 1 && esParParaSplit(playerHands[0])
    );
  }

  function puedeDoblar(i = currentHand) {
    return playerHands[i] && playerHands[i].length === 2 && cupo >= bets[i];
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

    score_player.textContent = totalMano(manoPlayer);
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

  btn_doblar_blackjack.classList.add("btn_disable");
  btn_dividir_blackjack.classList.add("btn_disable");

  btn_doblar_blackjack.addEventListener("click", () => {
    if (!puedeDoblar()) {
      Swal.fire({
        icon: "warning",
        title: "No puedes doblar esta mano",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }

    Swal.fire({
      title: "¿Doblar?",
      text: "Recibirás una sola carta y te plantarás.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, doblar",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    }).then((res) => {
      if (res.isConfirmed) {
        // descontar del cupo el extra de la apuesta
        cupo -= bets[currentHand];
        bets[currentHand] *= 2;
        _cupo.textContent = formatoPesos_monto_efectivo.format(cupo);
        _apuesta.textContent = formatoPesos_monto_efectivo.format(
          bets.reduce((a, b) => a + b, 0)
        );

        // una carta a la mano actual y auto-stand
        repartirA(playerBoards[currentHand], playerHands[currentHand]);
        actualizarPuntajes({ showHole: false });

        avanzarManoODealer(); // pasamos a la siguiente mano o vamos con el dealer
      }
    });
  });

  btn_dividir_blackjack.addEventListener("click", () => {
    if (!puedeDividir()) {
      Swal.fire({
        icon: "warning",
        title: "No puedes dividir esta mano",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }

    // ¿hay cupo para igualar la apuesta de la mano 0?
    if (cupo < bets[0]) {
      Swal.fire({
        icon: "warning",
        title: "Sin fondos para dividir",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }

    Swal.fire({
      title: "¿Dividir?",
      text: "Se crearán dos manos con la misma apuesta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dividir",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    }).then((res) => {
      if (!res.isConfirmed) return;

      splitActive = true;

      // 1) Duplicar apuesta para la 2da mano
      cupo -= bets[0];
      bets.push(bets[0]); // misma apuesta en la mano 2
      _cupo.textContent = formatoPesos_monto_efectivo.format(cupo);
      _apuesta.textContent = formatoPesos_monto_efectivo.format(
        bets.reduce((a, b) => a + b, 0)
      );

      // 2) Crear/obtener el tablero para la 2da mano
      const board2 = crearBoardSegundaMano();

      // 3) Sacar la segunda carta de la mano 0 y moverla al nuevo board
      const segundaCarta = playerHands[0].pop(); // quita la 2da carta de la mano 1
      playerHands.push([segundaCarta]); // crea mano 2 con esa carta
      playerBoards.push(board2);

      // Mover la imagen existente (usa id seguro 'carta_X')
      const safeId = `carta_${segundaCarta.slice(0, -1)}`;
      let imgSeg = board_player.querySelector(`#${safeId}`);
      if (imgSeg) {
        board2.appendChild(imgSeg);
      } else {
        // Fallback por si no encuentra la imagen: vuelve a pintar la carta en board2
        mostrarCarta(board2, segundaCarta, false);
      }

      // 4) Repartir una carta adicional a cada mano
      repartirA(playerBoards[0], playerHands[0]); // mano 1
      repartirA(playerBoards[1], playerHands[1]); // mano 2

      // 5) Actualizar puntajes visibles (si tienes marcador para mano 2)
      actualizarPuntajes({ showHole: false });
      if (score2) score2.textContent = totalMano(playerHands[1]);

      // 6) Si eran Ases (A/A), una carta por mano y ambas se plantan según regla común
      const rA = playerHands[0][0].slice(0, -1);
      const rB = playerHands[1][0].slice(0, -1);
      if (rA === "A" && rB === "A") {
        // Ir directo al dealer (no se permiten más hits)
        avanzarManoODealer(true);
        // UI
        btn_sacar_carta_blackjack.classList.add("btn_disable");
        btn_doblar_blackjack.classList.add("btn_disable");
        btn_dividir_blackjack.classList.add("btn_disable");
        btn_plantarse_blackjack.classList.remove("btn_disable");
        return;
      }

      // 7) UI post-split: jugarás primero la mano 1 (currentHand = 0)
      currentHand = 0;
      btn_dividir_blackjack.classList.add("btn_disable"); // (desactiva re-split si no soportas multisplit)
      btn_sacar_carta_blackjack.classList.remove("btn_disable");
      btn_plantarse_blackjack.classList.remove("btn_disable");

      // Habilitar/Deshabilitar 'Doblar' según regla (solo con 2 cartas y saldo suficiente)
      if (typeof puedeDoblar === "function" && puedeDoblar(currentHand)) {
        btn_doblar_blackjack.classList.remove("btn_disable");
      } else {
        btn_doblar_blackjack.classList.add("btn_disable");
      }
      const total = totalMano(manoPlayer);

      if (score2.textContent === 21 || total === 21) {
        decidirGanador();
      }
    });
  });

  function avanzarManoODealer(forzarFinalManos = false) {
    // ¿quedan manos por jugar?
    if (!forzarFinalManos && currentHand + 1 < playerHands.length) {
      currentHand++;
      // habilitar/deshabilitar doble según mano
      if (puedeDoblar(currentHand)) {
        btn_doblar_blackjack.classList.remove("btn_disable");
      } else {
        btn_doblar_blackjack.classList.add("btn_disable");
      }
      return;
    }

    // Dealer
    revelarCartaOcultaDealer().then(() => {
      turnoDealer().then(() => {
        decidirGanador();
      });
    });
  }

  function crearBoardSegundaMano() {
    let board2 = document.getElementById("board_player2");
    if (!board2) {
      board2 = document.createElement("div");
      board2.id = "board_player2";
      board2.className = "board_player hand_2"; // añade estilos si quieres
      board_player.parentElement.appendChild(board2);
    }
    return board2;
  }

  // Botón del mazo 2
  document.getElementById("btn_mazo2").addEventListener("click", () => {
    const board2 = document.getElementById("board_player2");
    repartirA(board2, manoPlayer2); 
    actualizarSumaSegundaMano();
  });

  // Calcula y pinta el total de la mano 2
  function actualizarSumaSegundaMano() {
    const total2 = totalMano(manoPlayer2); // usa tu misma totalMano(mano)
    const marcador2 = document.getElementById("score_player2");
    if (marcador2) marcador2.textContent = Number(marcador2.textContent) + total2,"suma";

    // Si quieres cerrar la mano cuando 21+:
    if (marcador2.textContent >= 21) {
      // avanzar a dealer o a la siguiente mano si la hay
      decidirGanador();
    }
  }

  function agregarCartaSegundaMano(carta) {
    manoPlayer2.push(carta);
    mostrarCarta(carta, board2);
    actualizarSumaSegundaMano();
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

    btn_doblar_blackjack.classList.remove("btn_disable");
    btn_dividir_blackjack.classList.remove("btn_disable");
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

    playerHands = [manoPlayer]; // mano principal
    playerBoards = [board_player]; // mismo contenedor para la 1ra mano
    bets = [apuesta]; // copia apuesta de la mesa en la 1ra mano
    currentHand = 0;
    splitActive = false;

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

    console.log(score2);

    let test_img = board_player.querySelectorAll("img").length;

    if (score2 == !null) {
      console.log("entro a score 2");
      let board_2 = document.getElementById("board_player2");
      let cartas_board_2 = board_2.querySelectorAll("img").length;
      if (score2.textContent === 21 && cartas_board_2 === 2) {
        console.log("entro al longitud");
        return finDeRonda("BlackJack", "Sacaste BlackJack con el segundo mazo");
      } else if (score2.textContent > totalD) {
        return finDeRonda("Ganaste", "Ganaste con el segundo mazo");
      } else if (score2.textContent < totalD) {
        return finDeRonda("Perdiste", "Te pasaste en el segundo mazo");
      }
    }

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
    if (totalD > 21)
      return finDeRonda("Ganaste", "El Dealer se paso, ", apuesta);
    if (totalP > totalD)
      return finDeRonda("Ganaste", "Tienes mejores cartas, ", apuesta);
    if (totalP < totalD)
      return finDeRonda(
        "Perdiste",
        "El Dealer Tiene mejores cartas, ",
        apuesta
      );
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
    btn_doblar_blackjack.classList.add("btn_disable");
    btn_dividir_blackjack.classList.add("btn_disable");
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
    content_fichas_menos.classList.remove("btn_disable");
    msj_reiniciar.style.display = "none";

    btn_doblar_blackjack.classList.add("btn_disable");
    btn_dividir_blackjack.classList.add("btn_disable");

    if (document.getElementById("board_player2")) {
      document.getElementById("board_player2").textContent = "";
    }

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
