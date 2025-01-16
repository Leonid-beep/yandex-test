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
    const totalText = totalSpan.textContent;
    while (counterElem.firstChild) {
      counterElem.removeChild(counterElem.firstChild);
    }
    const textNode = document.createTextNode(`${currentCount}\u00A0`);
    counterElem.appendChild(textNode);
    const newSpan = document.createElement('span');
    newSpan.classList.add('members__total');
    newSpan.textContent = totalText;
    counterElem.appendChild(newSpan);
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

function resetAutoSlideTimer() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 4000);
}

prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    prevSlide();
    resetAutoSlideTimer();
  });
});

nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    nextSlide();
    resetAutoSlideTimer();
  });
});

window.addEventListener('resize', () => {
  currentSlide = 0;
  showSlide(currentSlide);
  resetAutoSlideTimer();
});


autoSlideTimer = setInterval(nextSlide, 4000);

showSlide(currentSlide);
