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
