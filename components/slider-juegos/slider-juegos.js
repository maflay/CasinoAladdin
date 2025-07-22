(() => {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dotsContainer");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (track) {
    track.addEventListener("click", () => {
      navegarA("juegos");
    });
  }

  let currentIndex = 0;

  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const slidesToShow = getSlidesToShow();
    const percentage = (100 / slidesToShow) * currentIndex;
    track.style.transform = `translateX(-${percentage}%)`;
    document.querySelectorAll(".dots button").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function moveSlide(direction) {
    const slidesToShow = getSlidesToShow();
    const totalVisible = slides.length - slidesToShow + 1;

    currentIndex += direction;
    if (currentIndex >= totalVisible) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalVisible - 1;

    updateSlider();
  }

  btnPrev.addEventListener("click", () => moveSlide(-1));
  btnNext.addEventListener("click", () => moveSlide(1));
  setInterval(() => {
    moveSlide(1);
  }, 7000);

  function createDots() {
    dotsContainer.innerHTML = "";
    const slidesToShow = getSlidesToShow();
    const totalVisible = slides.length - slidesToShow + 1;

    for (let i = 0; i < totalVisible; i++) {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  window.addEventListener("resize", () => {
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
})();
