// Обёрнём код в функцию, чтобы избежать конфликтов с глобальными переменными.
(function() {
  // Получаем все карточки участников
  const members = document.querySelectorAll('.members__profile');
  const totalMembers = members.length; // всего участников

  // Получаем кнопки и счётчики (их две пары при разных разрешениях)
  const prevButtons = document.querySelectorAll('#prev');
  const nextButtons = document.querySelectorAll('#next');
  const counters = document.querySelectorAll('#counter');

  // Индекс "слайда" (текущее смещение, зависящее от разрешения).
  // Для широкоэкрана (≥721px) каждый "слайд" = 3 участника,
  // для мобильного экрана (≤720px) каждый "слайд" = 1 участник.
  let currentSlide = 0;

  /**
   * Проверяем, широкое ли сейчас окно:
   * true, если ширина ≥ 721px; false, если ≤ 720px.
   */
  function isWideScreen() {
    return window.innerWidth >= 721;
  }

  /**
   * Сколько участников показывать на одном "слайде" в зависимости от ширины экрана.
   */
  function getMembersPerSlide() {
    return isWideScreen() ? 3 : 1;
  }

  /**
   * Сколько всего слайдов (не превышая общее число участников).
   * Например, при 6 участниках и показе по 3 за раз будет 2 "слайда" (индексы 0 и 1).
   * При мобильном экране (1 за раз) будет 6 "слайдов" (индексы от 0 до 5).
   */
  function getMaxSlideIndex() {
    return Math.ceil(totalMembers / getMembersPerSlide()) - 1;
  }

  /**
   * Прячем всех участников, чтобы потом показать только нужных
   */
  function hideAllMembers() {
    members.forEach(member => {
      member.style.display = 'none';
    });
  }

  /**
   * Обновляем счётчик (например, "3 / 6" или "1 / 6").
   * Для широкого экрана, если currentSlide = 0, показывается 3 из 6, если = 1, то 6/6.
   * Для мобильного, если currentSlide = 0, то 1/6; =1 -> 2/6 и т.д.
   */
  function updateCounters() {
    // Сколько участников уже "пролистано" + 1 слайд
    const membersPerSlide = getMembersPerSlide();
    const currentCount = Math.min((currentSlide + 1) * membersPerSlide, totalMembers);

    // Обновим все счётчики на странице
    counters.forEach(counterElem => {
      counterElem.textContent = currentCount + ' / ' + totalMembers;
    });
  }

  /**
   * Показываем участников, соответствующих текущему слайду
   */
  function showSlide(slideIndex) {
    hideAllMembers();

    // Сколько участников на одном слайде
    const membersPerSlide = getMembersPerSlide();

    // Начало и конец диапазона в массиве всех участников
    const start = slideIndex * membersPerSlide;
    const end = start + membersPerSlide;

    for (let i = start; i < end; i++) {
      if (members[i]) {
        members[i].style.display = 'block';
      }
    }

    // После отображения — обновляем текст счётчиков
    updateCounters();
  }

  /**
   * Листаем на один слайд вперёд
   */
  function nextSlide() {
    if (currentSlide < getMaxSlideIndex()) {
      currentSlide++;
    }
    showSlide(currentSlide);
  }

  /**
   * Листаем на один слайд назад
   */
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    }
    showSlide(currentSlide);
  }

  // Вешаем обработчики на все кнопки "влево" и "вправо" (и верхние, и нижние)
  prevButtons.forEach(button => {
    button.addEventListener('click', prevSlide);
  });
  nextButtons.forEach(button => {
    button.addEventListener('click', nextSlide);
  });

  // При смене размеров окна — обновим слайды.
  // Обычно сбрасывают currentSlide = 0, но можно оставить и тот же индекс.
  // Ниже пример – сброс к 0, если хотите.
  window.addEventListener('resize', () => {
    currentSlide = 0;
    showSlide(currentSlide);
});

// Изначально покажем первый "слайд"
showSlide(currentSlide);
})();
