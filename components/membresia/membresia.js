
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
      // Cargar script dinámicamente
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
  fetch("/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("ubicacion-seccion");
      contenedor.innerHTML = html;

      // Cargar CSS dinámicamente
      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.css";
      document.head.appendChild(estilo);

      // Cargar script dinámicamente
      const script = document.createElement("script");
      script.src =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.js";
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



// function sliderhome() {
//   const track = document.getElementById("sliderTrackC");
//   const radios = document.querySelectorAll('input[name="slider-radioC"]');
//   const labels = document.querySelectorAll(".slider-controlsC label");
//   const prevBtnh = document.getElementById("prevBtnC");
//   const nextBtnh = document.getElementById("nextBtnC");

//   let currentIndex = 0;
//   const totalSlides = radios.length;
//   let interval;
//   let startX = 0;
//   let deltaX = 0;
//   let isDragging = false;

//   function goToSlide(index) {
//     track.style.transition = "transform 0.5s ease";
//     track.style.transform = `translateX(-${index * 100}vw)`;
//     radios[index].checked = true;
//     currentIndex = index;
//   }

//   function nextSlide() {
//     const index = (currentIndex + 1) % totalSlides;
//     goToSlide(index);
//   }

//   function prevSlide() {
//     const index = (currentIndex - 1 + totalSlides) % totalSlides;
//     goToSlide(index);
//   }

//   function resetInterval() {
//     clearInterval(interval);
//     interval = setInterval(nextSlide, 7000);
//   }

//   nextBtnh.addEventListener("click", () => {
//     nextSlide();
//     resetInterval();
//   });

//   prevBtnh.addEventListener("click", () => {
//     prevSlide();
//     resetInterval();
//   });

//   labels.forEach((label, index) => {
//     label.addEventListener("click", () => {
//       goToSlide(index);
//       resetInterval();
//     });
//   });

//   interval = setInterval(nextSlide, 7000);

//   track.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     startX = e.pageX;
//     deltaX = 0;
//     track.style.transition = "none";
//   });

//   track.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     deltaX = e.pageX - startX;
//     track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
//   });

//   track.addEventListener("mouseup", () => {
//     if (!isDragging) return;
//     isDragging = false;
//     track.style.transition = "transform 0.5s ease";
//     handleSwipe();
//   });

//   track.addEventListener("mouseleave", () => {
//     if (isDragging) {
//       isDragging = false;
//       track.style.transition = "transform 0.5s ease";
//       handleSwipe();
//     }
//   });

//   track.addEventListener("touchstart", (e) => {
//     isDragging = true;
//     startX = e.touches[0].clientX;
//     deltaX = 0;
//     track.style.transition = "none";
//   }, { passive: true });

//   track.addEventListener("touchmove", (e) => {
//     if (!isDragging) return;
//     deltaX = e.touches[0].clientX - startX;
//     track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
//   }, { passive: true });

//   track.addEventListener("touchend", () => {
//     if (!isDragging) return;
//     isDragging = false;
//     track.style.transition = "transform 0.5s ease";
//     handleSwipe();
//   });

//   function handleSwipe() {
//     if (deltaX > 50) {
//       prevSlide();
//     } else if (deltaX < -50) {
//       nextSlide();
//     } else {
//       goToSlide(currentIndex);
//     }
//     resetInterval();
//   }

//   goToSlide(currentIndex);
// }


// sliderhome();


