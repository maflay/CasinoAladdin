//(() => {
// const btntoCosmo = document.getElementById("toCosmomi");
// const btntotermi1 = document.getElementById("toTermi1");
// const btntotermi2 = document.getElementById("toTermi2");
// const btntoSportbar = document.getElementById("toSportbar");
// const btntoCayzedo = document.getElementById("toCayzedo");
// const btntoCosmocali = document.getElementById("toCosmocali");
// const btntoCalima = document.getElementById("toCalima");
// const btnmitierrauni = document.getElementById("toTierraunicentro");
// const btntoLago = document.getElementById("toLago");
// const btnla18 = document.getElementById("la18");
// const btnla22 = document.getElementById("la22");
// const btntoSeptima = document.getElementById("toSeptima");
// const btntoTenquendama = document.getElementById("toTenquendama");
// const btntoDragonfenix = document.getElementById("toDragonfenix");
// const btntoCallesarmiento = document.getElementById("toCallesarmiento");
// const btntoGirasol = document.getElementById("toGirasol");
// const btntoMorocco = document.getElementById("toMorocco");
// const btntoLindavista = document.getElementById("toLindavista");
// const btntoBellohorizonte = document.getElementById("toBellohorizonte");
// const btntoEsteli = document.getElementById("toEsteli");
// const btntoTipitapa = document.getElementById("toTipitapa");
// btntoCosmo.addEventListener("click", () => {
//   navegarA("casinocosmocentromitierra");
// });
// btntotermi1.addEventListener("click", () => {
//   navegarA("casinoterminal1");
// });
// btntotermi2.addEventListener("click", () => {
//   navegarA("casinoterminal2");
// });
// btntoSportbar.addEventListener("click", () => {
//   navegarA("casinosportbar");
// });
// btntoCayzedo.addEventListener("click", () => {
//   navegarA("casinoplazacayzedo");
// });
// btntoCosmocali.addEventListener("click", () => {
//   navegarA("casinocosmocentrocali");
// });
// btntoCalima.addEventListener("click", () => {
//   navegarA("casinocalima");
// });
// btnmitierrauni.addEventListener("click", () => {
//   navegarA("casinomitierraunicentro");
// });
// btntoLago.addEventListener("click", () => {
//   navegarA("casinolago");
// });
// btnla18.addEventListener("click", () => {
//   navegarA("casinola18");
// });
// btnla22.addEventListener("click", () => {
//   navegarA("casinola22");
// });
// btntoSeptima.addEventListener("click", () => {
//   navegarA("casinoseptima");
// });
// btntoTenquendama.addEventListener("click", () => {
//   navegarA("casinotequendama");
// });
// btntoDragonfenix.addEventListener("click", () => {
//   navegarA("casinodragonfenix");
// });
// btntoCallesarmiento.addEventListener("click", () => {
//   navegarA("casinocallesarmiento");
// });
// btntoGirasol.addEventListener("click", () => {
//   navegarA("casinogirasol");
// });
// btntoMorocco.addEventListener("click", () => {
//   navegarA("casinomorocco");
// });
// btntoLindavista.addEventListener("click", () => {
//   navegarA("casinolindavista");
// });
// btntoBellohorizonte.addEventListener("click", () => {
//   navegarA("casinobellohorizonte");
// });
// btntoEsteli.addEventListener("click", () => {
//   navegarA("casinoelteli");
// });
// btntoTipitapa.addEventListener("click", () => {
//   navegarA("casinotipitapa");
// });
//})();

function sliderhome() {
  const track = document.getElementById("sliderTrackC");
  const radios = document.querySelectorAll('input[name="slider-radioC"]');
  const labels = document.querySelectorAll(".slider-controlsC label");
  const prevBtnh = document.getElementById("prevBtnC");
  const nextBtnh = document.getElementById("nextBtnC");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  function goToSlide(index) {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * 100}vw)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    const index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    const index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    deltaX = 0;
    track.style.transition = "none";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.pageX - startX;
    track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
  });

  track.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";
    handleSwipe();
  });

  track.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = "transform 0.5s ease";
      handleSwipe();
    }
  });

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    deltaX = 0;
    track.style.transition = "none";
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    deltaX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";
    handleSwipe();
  });

  function handleSwipe() {
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  }

  goToSlide(currentIndex);
}


sliderhome();

function sliderCali() {
  const track = document.getElementById("sliderTrackCali");
  const radios = document.querySelectorAll('input[name="slider-radioCali"]');
  const labels = document.querySelectorAll(".slider-controlsCali label");
  const prevBtnh = document.getElementById("prevBtnCali");
  const nextBtnh = document.getElementById("nextBtnCali");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  
  let startX = 0;
  let isDragging = false;
  let deltaX = 0;

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = "none";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.pageX - startX;
    track.style.transform = `translateX(calc(-${
      currentIndex * 100
    }% + ${deltaX}px))`;
  });

  track.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });

  track.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = "transform 0.5s ease";
      goToSlide(currentIndex);
    }
  });

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = "none";
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(calc(-${
        currentIndex * 100
      }% + ${deltaX}px))`;
    },
    { passive: true }
  );

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });
}

sliderCali();

function sliderPereira() {
  const track = document.getElementById("sliderTrackPereira");
  const radios = document.querySelectorAll('input[name="slider-radioPereira"]');
  const labels = document.querySelectorAll(".slider-controlsPereira label");
  const prevBtnh = document.getElementById("prevBtnPereira");
  const nextBtnh = document.getElementById("nextBtnPereira");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  
  let startX = 0;
  let isDragging = false;
  let deltaX = 0;

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = "none";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.pageX - startX;
    track.style.transform = `translateX(calc(-${
      currentIndex * 100
    }% + ${deltaX}px))`;
  });

  track.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });

  track.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = "transform 0.5s ease";
      goToSlide(currentIndex);
    }
  });

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = "none";
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(calc(-${
        currentIndex * 100
      }% + ${deltaX}px))`;
    },
    { passive: true }
  );

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });
}

sliderPereira();

function sliderBogota() {
  const track = document.getElementById("sliderTrackBogota");
  const radios = document.querySelectorAll('input[name="slider-radioBogota"]');
  const labels = document.querySelectorAll(".slider-controlsBogota label");
  const prevBtnh = document.getElementById("prevBtnBogota");
  const nextBtnh = document.getElementById("nextBtnBogota");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  
  let startX = 0;
  let isDragging = false;
  let deltaX = 0;

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = "none";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.pageX - startX;
    track.style.transform = `translateX(calc(-${
      currentIndex * 100
    }% + ${deltaX}px))`;
  });

  track.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });

  track.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = "transform 0.5s ease";
      goToSlide(currentIndex);
    }
  });

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = "none";
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(calc(-${
        currentIndex * 100
      }% + ${deltaX}px))`;
    },
    { passive: true }
  );

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";

    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  });
}

sliderBogota();

function sliderBarranquilla() {
  const track = document.getElementById("sliderTrackBarranquilla");
  const radios = document.querySelectorAll(
    'input[name="slider-radioBarranquilla"]'
  );
  const labels = document.querySelectorAll(
    ".slider-controlsBarranquilla label"
  );
  const prevBtnh = document.getElementById("prevBtnBarranquilla");
  const nextBtnh = document.getElementById("nextBtnBarranquilla");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  
  // let startX = 0;
  // let isDragging = false;
  // let deltaX = 0;

  // track.addEventListener("mousedown", (e) => {
  //   isDragging = true;
  //   startX = e.pageX;
  //   track.style.transition = "none";
  // });

  // track.addEventListener("mousemove", (e) => {
  //   if (!isDragging) return;
  //   deltaX = e.pageX - startX;
  //   track.style.transform = `translateX(calc(-${
  //     currentIndex * 100
  //   }% + ${deltaX}px))`;
  // });

  // track.addEventListener("mouseup", () => {
  //   if (!isDragging) return;
  //   isDragging = false;
  //   track.style.transition = "transform 0.5s ease";

  //   if (deltaX > 50) {
  //     prevSlide();
  //   } else if (deltaX < -50) {
  //     nextSlide();
  //   } else {
  //     goToSlide(currentIndex); // volver al actual
  //   }
  //   resetInterval();
  // });

  // track.addEventListener("mouseleave", () => {
  //   if (isDragging) {
  //     isDragging = false;
  //     track.style.transition = "transform 0.5s ease";
  //     goToSlide(currentIndex);
  //   }
  // });

  // track.addEventListener(
  //   "touchstart",
  //   (e) => {
  //     startX = e.touches[0].clientX;
  //     isDragging = true;
  //     track.style.transition = "none";
  //   },
  //   { passive: true }
  // );

  // track.addEventListener(
  //   "touchmove",
  //   (e) => {
  //     if (!isDragging) return;
  //     deltaX = e.touches[0].clientX - startX;
  //     track.style.transform = `translateX(calc(-${
  //       currentIndex * 100
  //     }% + ${deltaX}px))`;
  //   },
  //   { passive: true }
  // );

  // track.addEventListener("touchend", () => {
  //   if (!isDragging) return;
  //   isDragging = false;
  //   track.style.transition = "transform 0.5s ease";

  //   if (deltaX > 50) {
  //     prevSlide();
  //   } else if (deltaX < -50) {
  //     nextSlide();
  //   } else {
  //     goToSlide(currentIndex);
  //   }
  //   resetInterval();
  // });
}

sliderBarranquilla();

function sliderTulua() {
  const track = document.getElementById("sliderTrackTulua");
  const radios = document.querySelectorAll('input[name="slider-radioTulua"]');
  const labels = document.querySelectorAll(".slider-controlsTulua label");
  const prevBtnh = document.getElementById("prevBtnTulua");
  const nextBtnh = document.getElementById("nextBtnTulua");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);

  // let startX = 0;
  // let isDragging = false;
  // let deltaX = 0;

  // track.addEventListener("mousedown", (e) => {
  //   isDragging = true;
  //   startX = e.pageX;
  //   track.style.transition = "none";
  // });

  // track.addEventListener("mousemove", (e) => {
  //   if (!isDragging) return;
  //   deltaX = e.pageX - startX;
  //   track.style.transform = `translateX(calc(-${
  //     currentIndex * 100
  //   }% + ${deltaX}px))`;
  // });

  // track.addEventListener("mouseup", () => {
  //   if (!isDragging) return;
  //   isDragging = false;
  //   track.style.transition = "transform 0.5s ease";

  //   if (deltaX > 50) {
  //     prevSlide();
  //   } else if (deltaX < -50) {
  //     nextSlide();
  //   } else {
  //     goToSlide(currentIndex); // volver al actual
  //   }
  //   resetInterval();
  // });

  // track.addEventListener("mouseleave", () => {
  //   if (isDragging) {
  //     isDragging = false;
  //     track.style.transition = "transform 0.5s ease";
  //     goToSlide(currentIndex);
  //   }
  // });

  // track.addEventListener(
  //   "touchstart",
  //   (e) => {
  //     startX = e.touches[0].clientX;
  //     isDragging = true;
  //     track.style.transition = "none";
  //   },
  //   { passive: true }
  // );

  // track.addEventListener(
  //   "touchmove",
  //   (e) => {
  //     if (!isDragging) return;
  //     deltaX = e.touches[0].clientX - startX;
  //     track.style.transform = `translateX(calc(-${
  //       currentIndex * 100
  //     }% + ${deltaX}px))`;
  //   },
  //   { passive: true }
  // );

  // track.addEventListener("touchend", () => {
  //   if (!isDragging) return;
  //   isDragging = false;
  //   track.style.transition = "transform 0.5s ease";

  //   if (deltaX > 50) {
  //     prevSlide();
  //   } else if (deltaX < -50) {
  //     nextSlide();
  //   } else {
  //     goToSlide(currentIndex);
  //   }
  //   resetInterval();
  // });
}

sliderTulua();

(() => {
  fetch("/components/promociones/promocion-view/promocion-view.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("promocion-seccion");
      contenedor.innerHTML = html;

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = "/components/promociones/promocion-view/promocion-view.css";
      document.head.appendChild(estilo);
      
      const script = document.createElement("script");
      script.src = "/components/promociones/promocion-view/promocion-view.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();
