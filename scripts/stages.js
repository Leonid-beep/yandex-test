document.addEventListener('DOMContentLoaded', () => {
  const stagesTable = document.querySelector('.stages__table');
  const items = Array.from(document.querySelectorAll('.stages__item'));
  const prevButton = document.getElementById('prev_button');
  const nextButton = document.getElementById('next_button');
  const dots = Array.from(document.querySelectorAll('.stages__dot'));

  let currentSlideIndex = 0;
  let slides = [];

  function createSlides() {
    if (window.innerWidth <= 720) {
      stagesTable.innerHTML = '';

      slides = [ [items[0], items[1]], [items[2]], [items[3], items[4]], [items[5]], [items[6]],];

      slides.forEach((slideItems, index) => {
        const slide = document.createElement('div');
        slide.classList.add('stages__slide');
        slideItems.forEach(item => slide.appendChild(item));
        stagesTable.appendChild(slide);
      });

      updateSlides();
    } else {
      if (slides.length > 0) {
        stagesTable.innerHTML = '';
        items.forEach(item => stagesTable.appendChild(item));
        slides = [];
      }
    }
  }

  function updateSlides() {
    const allSlides = document.querySelectorAll('.stages__slide');
    allSlides.forEach((slide, index) => {
      if (index === currentSlideIndex) {
        slide.classList.add('stages__slide_active');
      } else {
        slide.classList.remove('stages__slide_active');
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('stages__dot_active', index === currentSlideIndex);
    });

    prevButton.disabled = currentSlideIndex === 0;
    nextButton.disabled = currentSlideIndex === slides.length - 1;
  }

  function showPrevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
    } else {
      currentSlideIndex = slides.length - 1;
    }
    updateSlides();
  }

  function showNextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
    } else {
      currentSlideIndex = 0;
    }
    updateSlides();
  }

  prevButton.addEventListener('click', showPrevSlide);
  nextButton.addEventListener('click', showNextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlideIndex = index;
      updateSlides();
    });
  });

  createSlides();
  window.addEventListener('resize', createSlides);
});
