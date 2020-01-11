const scrollBtn = document.querySelector('.slider__dot');
const slider = document.querySelector('.zoomer__slider');
const completedLine = document.querySelector('.left__line__completed');
const showMenu = document.querySelector('.burger');
const menu = document.querySelector('.menu__wrapper');
const hideMenu = document.querySelector('.close__menu');
const gallery = document.querySelector('.gallery');

scrollBtn.onmousedown = e => {
  e.preventDefault();
  
  const onScrollMove = e => {
    let shiftDotX = e.clientX - slider.getBoundingClientRect().left;
    if (shiftDotX < 0) {
      shiftDotX = 0;
    }
    if (shiftDotX > slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth) {
      shiftDotX = slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth;
    }
    scrollBtn.style.left = shiftDotX + '%';
    completedLine.style.width = shiftDotX + '%';
  };
  
  const stopScrollMove = e => {
    document.removeEventListener('mouseup', stopScrollMove);
    document.removeEventListener('mousemove', onScrollMove);
  };
  
  document.addEventListener('mousemove', onScrollMove);
  document.addEventListener('mouseup', stopScrollMove);
};

scrollBtn.ontouchstart = e => {
  e.preventDefault();
  
  const onScrollMove = e => {
    let shiftDotX = e.touches[0].clientX - slider.getBoundingClientRect().left;
    if (shiftDotX < 0) {
      shiftDotX = 0;
    }
    if (shiftDotX > slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth) {
      shiftDotX = slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth;
    }
    scrollBtn.style.left = shiftDotX + '%';
    completedLine.style.width = shiftDotX + '%';
  };
  
  const stopScrollMove = e => {
    document.removeEventListener('touchend', stopScrollMove);
    document.removeEventListener('touchmove', onScrollMove);
  };
  
  document.addEventListener('touchmove', onScrollMove);
  document.addEventListener('touchend', stopScrollMove);
};

gallery.onclick = e => {
  if (e.target.className === 'burger' && !menu.classList.contains('.show')) return false;
  menu.classList.remove('show');
};

showMenu.onclick = () => {
  menu.classList.add('show');
};

hideMenu.onclick = () => {
  menu.classList.remove('show');
};

