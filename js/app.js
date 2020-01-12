const scrollBtn = document.querySelector('.slider__dot');
const slider = document.querySelector('.zoomer__slider');
const completedLine = document.querySelector('.left__line__completed');
const showMenu = document.querySelector('.burger');
const menu = document.querySelector('.menu__wrapper');
const gallery = document.querySelector('.gallery');
const app = document.querySelector('.app');
const galleryPhotos = document.querySelectorAll('.gallery__photo');
const zoomerSmall = menu.querySelector('.zommer__icon__small');
const zoomerBigger = menu.querySelector('.zoomer__icon__bigger');
const sliderLine = menu.querySelector('.zoomer__slider');

const gridTemplateColumns = (columns) => {
  for (let elem of galleryPhotos) {
    elem.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }
};

const paintingSliderLine = (shiftDotX, error = 0) => {
  scrollBtn.style.left = shiftDotX - error + '%';
  completedLine.style.width = shiftDotX + '%';
};

zoomerSmall.onclick = () => {
  gridTemplateColumns(4);
  paintingSliderLine(0);
};

zoomerBigger.onclick = () => {
  gridTemplateColumns(1);
  paintingSliderLine(90);
};

const sizeGalleryController = (size, shiftDotX) => {
  if (app.clientWidth >= size) {
    if (shiftDotX <= 25) {
      gridTemplateColumns(4);
    }
    if (shiftDotX >= 25) {
      gridTemplateColumns(3);
    }
    if (shiftDotX >= 50) {
      gridTemplateColumns(2);
    }
    if (shiftDotX >= 75) {
      gridTemplateColumns(1);
    }
  } else if (app.clientWidth < size) {
    if (shiftDotX <= 50) {
      gridTemplateColumns(3);
    }
    if (shiftDotX >= 50) {
      gridTemplateColumns(2);
    }
    if (shiftDotX >= 80) {
      gridTemplateColumns(1);
    }
  }
};

sliderLine.onclick = e => {
  sizeGalleryController(window.innerWidth, e.clientX - 60);
  paintingSliderLine(e.clientX - 60, 8);
};


const onclickSlider = (e, X, mouseup, mousemove) => {
  e.preventDefault();
  const onScrollMove = X => {
    let shiftDotX = mouseup === 'mouseup'
      ? X.clientX - slider.getBoundingClientRect().left
      : X.touches[0].clientX - slider.getBoundingClientRect().left;
    if (shiftDotX < 0) {
      shiftDotX = 0;
    }
    if (shiftDotX > slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth) {
      shiftDotX = slider.getBoundingClientRect().right - slider.getBoundingClientRect().left - scrollBtn.clientWidth;
    }
    paintingSliderLine(shiftDotX);
    sizeGalleryController(1000, shiftDotX);
  };
  
  const stopScrollMove = () => {
    document.removeEventListener(mouseup, stopScrollMove);
    document.removeEventListener(mousemove, onScrollMove);
  };
  
  document.addEventListener(mousemove, onScrollMove);
  document.addEventListener(mouseup, stopScrollMove);
};


scrollBtn.ontouchstart = e => onclickSlider(e, e.touches[0].clientX, 'touchend', 'touchmove');
scrollBtn.onmousedown = e => onclickSlider(e, e.clientX, 'mouseup', 'mousemove');


gallery.onclick = e => {
  if (e.target.className === 'burger' && !menu.classList.contains('.show')) return false;
  menu.classList.remove('show');
};

showMenu.onclick = () => {
  menu.classList.add('show');
};


