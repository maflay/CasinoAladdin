(() => {
  const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const btn_jugar_baccarat = document.getElementById("btn_jugar_baccarat");

  btn_jugar_baccarat.addEventListener("click", () => {
    startGame();
  });

  function startGame() {
    document.getElementById("pre_view_bac").style.display = "none";
    document.getElementById("content_game_all").style.display = "block";
  }

  const suits = ["H", "D", "S", "C"];
  const cardName = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];

  const generateDeck = (amount) => {
    const deck = [];
    for (let i = 0; i < amount; i++) {
      for (let suit of suits) {
        for (let name of cardName) {
          deck.push(`${name}${suit}`);
        }
      }
    }
    return deck;
  };

  var buenas = 0;
  function getRandomCard() {
    let randomCardIndex = Math.floor(Math.random() * decks.length);
    let randomCard = decks[randomCardIndex];
    decks.splice(randomCardIndex, 1);

    let cardImage = document.createElement("img");
    cardImage.src = `/resources/cartas\\${randomCard}.svg`;
    cardImage.id = "card";
    cardImage.classList.add("card");
    buenas = randomCard[0];
    return [cardImage, randomCard[0]];
  }

  const playerField = document.querySelector("#playerCards");
  const bankerField = document.querySelector("#bankerCards");

  const infoBoard = document.querySelector("#info");

  const dealButton = document.querySelector("#dealButton");
  dealButton.addEventListener("click", deal);
  const buttonSection = document.querySelector("#buttonSection");

  const drawButton = document.createElement("span");
  drawButton.classList.add("btn_apostar");
  drawButton.id = "drawButton";
  drawButton.innerText = " Repartir";
  drawButton.title = "Repartir";
  drawButton.addEventListener("click", draw);

  const nextHandButton = document.createElement("span");
  nextHandButton.classList.add("btn_apostar");
  nextHandButton.id = "nextHandButton";
  nextHandButton.innerText = "Siguiente Mano";
  nextHandButton.title = "Siguiente Mano";
  nextHandButton.addEventListener("click", reset);

  const decks = generateDeck(8);

  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 1,
  };

  let playerScore = 0;
  let bankerScore = 0;
  const pScore = document.querySelector("#playerScore");
  const bScore = document.querySelector("#bankerScore");

  let playerThirdCard = null;
  let turns = 1;

  let playerPickups = true;
  let bankerPickups = true;

  let gameStart = false;

  function deal() {
    infoBoard.innerText = "Jugando...";

    if (betChoice == null) {
      infoBoard.innerText = "Primero elije el equipo.";
      Swal.fire({
        icon: "warning",
        title: "Primero elije el equipo de tu preferencia.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    } else if (betNumber > 0) {
      undoButton.remove();
      gameStart = true;
      dealButton.style.display = "none";
      buttonSection.append(drawButton);
      document.getElementById("betButtons").classList.add("item_disable");
      document.getElementById("chips").classList.add("item_disable");

      const randomCard = getRandomCard();
      const card = randomCard[0];
      playerScore = playerScore + cardValues[randomCard[1]];
      playerField.append(card);
      scoreUpdater();
    } else {
      infoBoard.innerText = "Necesitas realizar una apuesta, para poder jugar.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ Necesitas realizar una apuesta, para poder jugar.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    }
  }

  function scoreUpdater() {
    if (playerScore > 9) {
      playerScore -= 10;
    }
    if (bankerScore > 9) {
      bankerScore -= 10;
    }
    pScore.innerText = playerScore;
    bScore.innerText = bankerScore;
  }

  function draw() {
    if (whoDrawsNext() == "player") {
      const randomCard = getRandomCard();
      const card = randomCard[0];
      if (document.querySelector("#playerCards").children.length == 2) {
        playerThirdCard = randomCard[1];
      }
      playerScore = playerScore + cardValues[randomCard[1]];
      playerField.append(card);
      scoreUpdater();
    } else if (whoDrawsNext() == "banker") {
      const randomCard = getRandomCard();
      const card = randomCard[0];
      bankerScore = bankerScore + cardValues[randomCard[1]];
      bankerField.append(card);
      scoreUpdater();
    }
    gameEndCheck();
  }

  function whoDrawsNext() {
    const playerCards = document.querySelector("#playerCards").children.length;
    const bankerCards = document.querySelector("#bankerCards").children.length;

    if (playerCards == 3 && bankerCards == 3) {
      return null;
    }
    if (playerCards < 2 || bankerCards < 2) {
      if (bankerCards < playerCards) {
        return "banker";
      } else if (bankerCards == playerCards) {
        return "player";
      } else if (playerCards < bankerCards) {
        return "banker";
      }
    }
    if (playerScore == 8 || playerScore == 9) {
      return null;
    } else if (bankerScore == 8 || bankerScore == 9) {
      return null;
    } else if (playerScore <= 5 && playerCards < 3) {
      return "player";
    } else if (playerScore == 6 || (playerScore == 7 && playerCards == 2)) {
      if (bankerScore < 6 && bankerCards < 3) {
        return "banker";
      }
    } else if (bankerCards < 3) {
      if (bankerScore <= 2) {
        return "banker";
      } else if (bankerScore == 3 && playerThirdCard != 8) {
        return "banker";
      } else if (bankerScore == 4) {
        const validCards = ["2", "3", "4", "5", "6", "7"];
        if (validCards.includes(playerThirdCard)) {
          return "banker";
        }
      } else if (bankerScore == 5) {
        const validCards = ["4", "5", "6", "7"];
        if (validCards.includes(playerThirdCard)) {
          return "banker";
        }
      } else if (bankerScore == 6) {
        const validCards = ["6", "7"];
        if (validCards.includes(playerThirdCard)) {
          return "banker";
        }
      }
    } else {
      gameEnd();
      return null;
    }
  }

  function gameEndCheck() {
    if (whoDrawsNext() == null) {
      gameEnd();
    }
  }

  function gameEnd() {
    gameStart = false;
    if (playerScore == bankerScore) {
      infoBoard.innerText = "Es un tie.";
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "🤝 Es un empate / Tie.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      if (betChoice == "tie") {
        winBet();
      } else {
        push();
      }
    } else if (playerScore > bankerScore) {
      infoBoard.innerText = "Jugador ganador.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ Has perdido, gano el jugador.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      if (betChoice == "playerBet") {
        winBet();
      } else {
        loseBet();
      }
    } else if (bankerScore > playerScore) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ Has perdido, gano la banca.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      infoBoard.innerText = "banca gano.";
      if (betChoice == "bankerBet") {
        winBet();
      } else {
        loseBet();
      }
    }

    drawButton.remove();
    buttonSection.append(nextHandButton);
  }

  function reset() {
    if (gameStart == false) {
      playerScore = 0;
      bankerScore = 0;
      infoBoard.innerText = "Inicia cuando quieras";
      playerField.innerHTML = "";
      bankerField.innerHTML = "";
      dealButton.style.display = "flex";
      nextHandButton.remove();
      pScore.innerText = "";
      bScore.innerText = "";
      playerThirdCard = null;
      document.getElementById("betButtons").classList.remove("item_disable");
      document.getElementById("chips").classList.remove("item_disable");
    } else {
      infoBoard.innerText = "No puede suceder a mitad del juego";
    }
  }

  const fiveChip = document.getElementById("10_chip");
  const tenChip = document.getElementById("25_chip");
  const twentyFiveChip = document.getElementById("50_chip");
  const fiftyChip = document.getElementById("100_chip");
  const hundredChip = document.getElementById("250_chip");
  const chipsSection = document.getElementById("chips");
  const content_deshacer = document.getElementById("content_deshacer");

  const undoButton = document.createElement("span");
  undoButton.id = "undoButton";
  undoButton.classList.add("btn_apostar");
  undoButton.innerText = "Deshacer";
  undoButton.title = "Deshacer Jugada";

  undoButton.addEventListener("click", undo);

  fiveChip.addEventListener("click", updateBet);
  tenChip.addEventListener("click", updateBet);
  twentyFiveChip.addEventListener("click", updateBet);
  fiftyChip.addEventListener("click", updateBet);
  hundredChip.addEventListener("click", updateBet);

  const betAmount = document.querySelector("#bet");
  const balance = document.getElementById("balance");

  let balanceNumber = 1000000;
  let betNumber = 0;

  balance.innerText = `${formatoPesos_monto_efectivo.format(balanceNumber)}`;

  let betChoice = null;

  function updateBet() {
    if (gameStart == false) {
      // const chipValue = parseInt(this.id.split("_")[0]);
      const chipValue = parseInt(this.dataset.valor);
      if (balanceNumber >= chipValue) {
        content_deshacer.append(undoButton);
        balanceNumber -= chipValue;
        balance.innerText = `${formatoPesos_monto_efectivo.format(
          balanceNumber
        )}`;
        betNumber += chipValue;
        betAmount.innerText = `${formatoPesos_monto_efectivo.format(
          betNumber
        )}`;
      } else {
        infoBoard.innerText = "Tu saldo es demasiado bajo para esta apuesta.";
        Swal.fire({
          icon: "warning",
          title: "Fondos insuficientes para esta apuesta",
        });
      }
    } else {
      infoBoard.innerText = "No puedes cambiar tu apuesta a mitad del juego.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ No puedes cambiar tu apuesta a mitad del juego.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    }
  }

  const tie = document.querySelector("#tie");
  const bankerBet = document.querySelector("#bankerBet");
  const playerBet = document.querySelector("#playerBet");
  bankerBet.addEventListener("click", chooseTeam);
  playerBet.addEventListener("click", chooseTeam);
  tie.addEventListener("click", chooseTeam);

  function chooseTeam() {
    if (gameStart == false) {
      tie.style.color = "#05cd84ad";
      bankerBet.style.color = "#05cd84ad";
      playerBet.style.color = "#05cd84ad";

      betChoice = this.id;
      this.style.color = "white";
    } else {
      infoBoard.innerText = "No puedes cambiar tu equipo a mitad del juego.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "❌ No puedes cambiar tu equipo a mitad del juego.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    }
  }

  function winBet() {
    let winnings = 0;
    if (betChoice == "playerBet") {
      winnings = betNumber * 2;
      balanceNumber += winnings;
      balance.innerText = `${formatoPesos_monto_efectivo.format(
        balanceNumber
      )}`;
    } else if (betChoice == "bankerBet") {
      winnings = betNumber + 0.95 * betNumber;
      balanceNumber += winnings;
      balance.innerText = `${formatoPesos_monto_efectivo.format(
        balanceNumber
      )}`;
    } else if (betChoice == "tie") {
      winnings = betNumber * 8;
      balanceNumber += winnings;
      balance.innerText = `${formatoPesos_monto_efectivo.format(
        balanceNumber
      )}`;
    }
    infoBoard.innerText =
      infoBoard.innerText +
      `  Ganastes :${formatoPesos_monto_efectivo.format(winnings)}`;
    betNumber = 0;
    betAmount.innerText = `${formatoPesos_monto_efectivo.format(betNumber)}`;
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: ` ✅ ¡Ganastes !.${winnings}`,
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    });
  }

  function loseBet() {
    betNumber = 0;
    betAmount.innerText = `${formatoPesos_monto_efectivo.format(betNumber)}`;
  }

  function push() {
    infoBoard.innerText = infoBoard.innerText + `  Obtuviste :${betNumber}`;
    balanceNumber += betNumber;
    betNumber = 0;
    balance.innerText = `${formatoPesos_monto_efectivo.format(balanceNumber)}`;
    betAmount.innerText = `${formatoPesos_monto_efectivo.format(betNumber)}`;
  }

  function undo() {
    balanceNumber += betNumber;
    betNumber = 0;
    balance.innerText = `${formatoPesos_monto_efectivo.format(balanceNumber)}`;
    betAmount.innerText = `${formatoPesos_monto_efectivo.format(betNumber)}`;
    this.remove();
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

  document.getElementById("btn_abrir_modal").addEventListener("click", () => {
    abrirModal();
  });

  function abrirModal() {
    document.getElementById("modal_reglas_baccarat").style.display = "flex";
    lockBodyScroll();
  }

  document.getElementById("btn_cerrar_modal").addEventListener("click", () => {
    cerrarModal();
  });

  function cerrarModal() {
    document.getElementById("modal_reglas_baccarat").style.display = "none";
    unlockBodyScroll();
  }

  function abrirModalInfo() {
    document.getElementById("info-baccarat-modal").style.display = "flex";
  }

  function cerrarModalInfo() {
    document.getElementById("info-baccarat-modal").style.display = "none";
  }
})();
