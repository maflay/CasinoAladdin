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
    track.style.transform = `translateX(calc(-${
      currentIndex * 100
    }vw + ${deltaX}px))`;
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

  track.addEventListener(
    "touchstart",
    (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      deltaX = 0;
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
      }vw + ${deltaX}px))`;
    },
    { passive: true }
  );

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
      goToSlide(currentIndex); // volver al actual
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

sliderBarranquilla();

function sliderBuga() {
  const track = document.getElementById("sliderTrackBuga");
  const radios = document.querySelectorAll('input[name="slider-radioBuga"]');
  const labels = document.querySelectorAll(".slider-controlsBuga label");
  const prevBtnh = document.getElementById("prevBtnBuga");
  const nextBtnh = document.getElementById("nextBtnBuga");

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

sliderBuga();

function sliderMonte() {
  const track = document.getElementById("sliderTrackMonte");
  const radios = document.querySelectorAll('input[name="slider-radioMonte"]');
  const labels = document.querySelectorAll(".slider-controlsMonte label");
  const prevBtnh = document.getElementById("prevBtnMonte");
  const nextBtnh = document.getElementById("nextBtnMonte");

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

sliderMonte();

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

(() => {
  fetch("/components/juegos/juegos-view/juegos-view.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("juegos-view-seccion");
      contenedor.innerHTML = html;

      // Cargar CSS dinámicamente
      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = "/components/juegos/juegos-view/juegos-view.css";
      document.head.appendChild(estilo);

      // Cargar script dinámicamente
      const script = document.createElement("script");
      script.src = "/components/juegos/juegos-view/juegos-view.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();

(() => {
  document
    .getElementById("btn_casinos_header")
    .addEventListener("click", () => {
      irASeccionCoordenadas();
    });

  function irASeccionCoordenadas() {
    const destino = document.getElementById("ubicaciones_casino");

    if (destino) {
      const posicionY =
        destino.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: posicionY,
        behavior: "smooth",
      });
    }
  }

  const festivosCO = [
    "2025-01-01", // Año Nuevo
    "2025-03-24", // San José (trasladado)
    "2025-04-17", // Jueves Santo
    "2025-04-18", // Viernes Santo
    "2025-05-01", // Día del Trabajo
    "2025-06-23", // Corpus Christi
    "2025-06-30", // Sagrado Corazón
    "2025-07-20", // Independencia
    "2025-08-07", // Batalla de Boyacá
    "2025-08-18", // Asunción
    "2025-10-13", // Día de la Raza
    "2025-11-03", // Todos los Santos
    "2025-11-17", // Independencia de Cartagena
    "2025-12-08", // Inmaculada Concepción
    "2025-12-25", // Navidad
  ];

  function obtenerProximoFestivo(zona = "America/Bogota") {
    // Fecha local actual
    const ahoraLocal = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const hoyISO = ahoraLocal.toISOString().split("T")[0]; // YYYY-MM-DD

    // Buscar el primer festivo mayor o igual a hoy
    const proximo = festivosCO.find((f) => f >= hoyISO);

    if (!proximo) return null; // No hay más festivos en la lista

    // Devolver en formato legible
    const fecha = new Date(proximo).toLocaleDateString("es-CO", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: zona,
    });

    return { fechaISO: proximo, fechaLegible: fecha };
  }

  function huboFestivoEntreSemanaEstaSemana(zona = "America/Bogota") {
    // Fecha actual en la zona correcta
    const ahoraLocal = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahoraLocal.getDay(); // 0=Dom, 1=Lun, ... 6=Sáb

    // Lunes de ESTA semana
    const diffHastaLunes = (diaSemana + 6) % 7; // Lunes → 0, Martes →1, ..., Domingo →6
    const lunes = new Date(ahoraLocal);
    lunes.setDate(ahoraLocal.getDate() - diffHastaLunes);

    // Sábado de esta semana (lunes + 5 días)
    const sabado = new Date(lunes);
    sabado.setDate(lunes.getDate() + 5);

    const inicio = lunes.toISOString().split("T")[0]; // YYYY-MM-DD
    const fin = sabado.toISOString().split("T")[0];

    // Ver si algún festivo está entre lunes y sábado
    return festivosCO.some((f) => f >= inicio && f <= fin);
  }

  const zona = "America/Bogota";

  // CALI HORARIO

  function validateCalimahor() {
    const contenedor = document.getElementById("disponible_cas_calima");

    // ⏰ Fecha actual en Bogotá
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay(); // 0=Dom, 1=Lun, ...
    const fechaActual = ahora.toISOString().split("T")[0];

    // 🧮 Obtener fecha del siguiente lunes
    const proxLunes = new Date(ahora);
    proxLunes.setDate(ahora.getDate() + ((1 - diaSemana + 7) % 7 || 7));
    const fechaLunes = proxLunes.toISOString().split("T")[0];

    // 💡 Determinar si el lunes es festivo
    const lunesEsFestivo = festivosCO.includes(fechaLunes);

    // 🔧 Definir horario según la regla
    let abre = "08:00"; // hora de apertura normal (domingo 8 AM)
    let cierra = "03:00"; // cierre lunes 3 AM (si lunes no es festivo)

    // Si el lunes es festivo → domingo 24 h
    if (diaSemana === 0 && lunesEsFestivo) {
      abre = "00:00";
      cierra = "23:59";
    }

    // 🧩 Validar si está dentro del horario
    validateOpenClose(abre, cierra, contenedor);
  }

  validateCalimahor();

  function validateMitierraCali() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_mitierra");
    let inicio = "12:00";
    let cierra = "21:00";
    const huboFestivo = huboFestivoEntreSemanaEstaSemana(zona);
    if (diaSemana === 0) {
      if (huboFestivo) {
        inicio = "12:00";
        cierra = "20:00";
      } else {
        inicio = "3:59";
        cierra = "4:00";
      }
    }

    validateOpenClose(inicio, cierra, contendor);
  }
  validateMitierraCali();

  function validatePlazaCayCali() {
    let contendor = document.getElementById("disponible_cas_plazacay");
    let inicio = "6:00";
    let cierra = "3:00";
    validateOpenClose(inicio, cierra, contendor);
  }
  validatePlazaCayCali();

  function validateKaraokeCali() {
    let contendor = document.getElementById("disponible_cas_karaoke");
    let inicio = "6:00";
    let cierra = "3:00";
    validateOpenClose(inicio, cierra, contendor);
  }
  validateKaraokeCali();

  function validateTerminalCali() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_terminal");
    let inicio = "4:00";
    let cierra = "3:59";

    if (diaSemana === 3) {
      inicio = "8:00";
      cierra = "6:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateTerminalCali();

  function validateSportCali() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_sportbar");
    let inicio = "9:00";
    let cierra = "00:00";
    if (diaSemana === 6 || diaSemana === 0) {
      inicio = "10:00";
      cierra = "18:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateSportCali();

  function validateCosmoCali() {
    let contendor = document.getElementById("disponible_cas_cosmo");
    let inicio = "8:00";
    let cierra = "6:00";
    validateOpenClose(inicio, cierra, contendor);
  }
  validateCosmoCali();

  //  PEREIRA HORARIO

  function validateLagoPere() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_lagop");
    let inicio = "8:00";
    let cierra = "22:00";
    if (diaSemana === 5 || diaSemana === 6) {
      inicio = "8:00";
      cierra = "00:00";
    } else if (diaSemana === 0) {
      inicio = "3:59";
      cierra = "4:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateLagoPere();

  function validateMitiPere() {
    let contendor = document.getElementById("disponible_cas_mitierrap");
    let inicio = "10:00";
    let cierra = "6:00";
    validateOpenClose(inicio, cierra, contendor);
  }
  validateMitiPere();

  function validatela18p() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_la18p");
    let inicio = "8:00";
    let cierra = "00:00";
    if (diaSemana === 0) {
      inicio = "8:00";
      cierra = "22:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validatela18p();

  function validatela22p() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_la22p");
    let inicio = "8:00";
    let cierra = "2:00";
    if (diaSemana === 5 || diaSemana === 6) {
      inicio = "8:00 AM";
      cierra = "3:00 AM";
    }
    validateOpenClose(inicio, cierra, contendor);
  }

  validatela22p();

  // ubicaciones bogota

  function validaTequeB() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_tequeb");
    let inicio = "10:00";
    let cierra = "5:00";
    if (diaSemana === 5) {
      inicio = "10:00";
      cierra = "23:00";
    } else if (diaSemana === 6) {
      inicio = "11:00";
      cierra = "21:00";
    } else if (diaSemana === 0) {
      inicio = "11:00";
      cierra = "20:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validaTequeB();

  function validateSeptiB() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_septib");
    let inicio = "10:00";
    let cierra = "22:00";
    if (diaSemana === 5) {
      inicio = "10:00";
      cierra = "23:00";
    } else if (diaSemana === 6 || diaSemana === 0) {
      inicio = "11:00";
      cierra = "21:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateSeptiB();

  // horario barranquilla

  function validateDragonBar() {
    let contendor = document.getElementById("disponible_cas_dragb");
    let inicio = "4:00";
    let cierra = "3:59";
    validateOpenClose(inicio, cierra, contendor);
  }
  validateDragonBar();

  function validateMallBar() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_mallb");
    let inicio = "10:00";
    let cierra = "3:00";
    if (diaSemana === 0) {
      inicio = "11:00";
      cierra = "00:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateMallBar();

  // horario tulua

  function validateTuluCas() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_tulu");
    let inicio = "10:00";
    let cierra = "00:00";
    if (diaSemana === 5 || diaSemana === 6) {
      inicio = "10:00";
      cierra = "1:00";
    } else if (diaSemana === 0) {
      inicio = "10:00";
      cierra = "21:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateTuluCas();

  function validateHorMonte() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_monte");
    let inicio = "9:00";
    let cierra = "00:00";
    if (diaSemana === 0) {
      inicio = "10:00";
      cierra = "22:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateHorMonte();

  function validateHorBuga() {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: zona })
    );
    const diaSemana = ahora.getDay();
    let contendor = document.getElementById("disponible_cas_buga");
    let inicio = "9:00";
    let cierra = "22:00";
    if (diaSemana === 0) {
      inicio = "10:00";
      cierra = "19:00";
    }
    validateOpenClose(inicio, cierra, contendor);
  }
  validateHorBuga();

  function validateOpenClose(abiertoH, cerradoH, contenedor) {
    const horario = {
      abre: abiertoH, // 3:00 AM
      cierra: cerradoH, // 8:00 AM
      zona: "America/Bogota",
    };

    // ⏰ Obtener hora local actual
    const ahora = new Date().toLocaleTimeString("es-CO", {
      timeZone: horario.zona,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    // 🔍 Convertir a minutos para comparar fácilmente
    function aMinutos(hora) {
      const [h, m] = hora.split(":").map(Number);
      return h * 60 + m;
    }

    const ahoraMin = aMinutos(ahora);
    const abreMin = aMinutos(horario.abre);
    const cierraMin = aMinutos(horario.cierra);

    // 💡 Permite horarios normales o que cruzan medianoche
    const abierto =
      abreMin < cierraMin
        ? ahoraMin >= abreMin && ahoraMin < cierraMin
        : ahoraMin >= abreMin || ahoraMin < cierraMin;

    // 🎯 Mostrar estado
    if (contenedor) {
      contenedor.textContent = abierto ? "ABIERTO" : "CERRADO";
      contenedor.style.color = abierto ? "lime" : "red";
    } else {
      contenedor.textContent = abierto = "" ? "No Disponible" : "No Disponible";
    }
  }
})();

(() => {
  if (document.getElementById("content-banner-membresia")) {
    fetch("/components/membresia/bannerMembresia/bannerMembresia.html")
      .then((res) => res.text())
      .then((html) => {
        const contenedor = document.getElementById("content-banner-membresia");
        contenedor.innerHTML = html;

        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href =
          "/components/membresia/bannerMembresia/bannerMembresia.css";
        document.head.appendChild(estilo);
        // Cargar script dinámicamente
        const script = document.createElement("script");
        script.src = "/components/membresia/bannerMembresia/bannerMembresia.js";
        script.onload = () => {
          if (typeof window.inicializarSliderUbicaciones === "function") {
            window.inicializarSliderUbicaciones();
          }
        };
        document.body.appendChild(script);
      });
  }
})();

function getDia() {
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [fechaBreve, horaBreve] = fechaCompleta.split(", ");

  console.log(fechaBreve);
  const valor = document.getElementById("fecha_casinos");
  valor.value = fechaBreve;
  valor.textContent = fechaBreve;
}

getDia();
