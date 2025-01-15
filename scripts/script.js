(function() {
  const members = document.querySelectorAll('.members__profile');
  const totalMembers = members.length;
  const prevButtons = document.querySelectorAll('#prev');
  const nextButtons = document.querySelectorAll('#next');
  const counters = document.querySelectorAll('#counter');

  let currentSlide = 0;

  function isWideScreen() {
    return window.innerWidth >= 721;
  }

  function getMembersPerSlide() {
    return isWideScreen() ? 3 : 1;
  }

  function getMaxSlideIndex() {
    return Math.ceil(totalMembers / getMembersPerSlide()) - 1;
  }

  function hideAllMembers() {
    members.forEach(member => {
      member.style.display = 'none';
    });
  }

  function updateCounters() {
    const membersPerSlide = getMembersPerSlide();
    const currentCount = Math.min((currentSlide + 1) * membersPerSlide, totalMembers);

    counters.forEach(counterElem => {
      const totalSpan = counterElem.querySelector('.members__total');
      if (totalSpan) {
        counterElem.innerHTML = `${currentCount}&nbsp;<span class="members__total">${totalSpan.innerHTML}</span>`;
      }
    });
  }

  function showSlide(slideIndex) {
    hideAllMembers();
    const membersPerSlide = getMembersPerSlide();
    const start = slideIndex * membersPerSlide;
    const end = start + membersPerSlide;

    for (let i = start; i < end; i++) {
      if (members[i]) {
        members[i].style.display = 'block';
      }
    }
    updateCounters();
  }

  function nextSlide() {
    if (currentSlide < getMaxSlideIndex()) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = getMaxSlideIndex();
    }
    showSlide(currentSlide);
  }

  prevButtons.forEach(button => {
    button.addEventListener('click', prevSlide);
  });
  nextButtons.forEach(button => {
    button.addEventListener('click', nextSlide);
  });

  window.addEventListener('resize', () => {
    currentSlide = 0;
    showSlide(currentSlide);
  });

  setInterval(nextSlide, 4000);

  showSlide(currentSlide);
})();



document.addEventListener('DOMContentLoaded', () => {
  const stagesTable = document.querySelector('.stages__table');
  const items = Array.from(document.querySelectorAll('.stages__item'));
  const prevButton = document.getElementById('prev_button');
  const nextButton = document.getElementById('next_button');
  const dots = Array.from(document.querySelectorAll('.stages__dot'));

  let currentSlideIndex = 0; // Индекс текущего слайда
  let slides = []; // Массив слайдов

  function createSlides() {
    if (window.innerWidth <= 720) {
      stagesTable.innerHTML = '';

      slides = [
        [items[0], items[1]],
        [items[2]],
        [items[3], items[4]],
        [items[5]],
        [items[6]],
      ];

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


document.querySelector('.intro__button_type_submit').addEventListener('click', function() {
    const stagesElement = document.querySelector('.tickets');
    if (stagesElement) {
      stagesElement.scrollIntoView({ behavior: 'smooth' });
    }
});

document.querySelector('.intro__button_type_more').addEventListener('click', function() {
    const stagesElement = document.querySelector('.members');
    if (stagesElement) {
      stagesElement.scrollIntoView({ behavior: 'smooth' });
    }
});
