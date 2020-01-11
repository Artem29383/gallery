const scrollBtn = document.querySelector('.slider__dot');
const slider = document.querySelector('.zoomer__slider');
const completedLine = document.querySelector('.left__line__completed');
const showMenu = document.querySelector('.burger');
const menu = document.querySelector('.menu__wrapper');
const gallery = document.querySelector('.gallery');
const photo = document.querySelectorAll('.photo__item');
const app = document.querySelector('.app');
const galleryPhotos = document.querySelectorAll('.gallery__photo');
const heightPhoto = photo[0].clientHeight / (app.clientWidth / 100);


/*window.addEventListener('resize', () => {
  console.log(heightPhoto);
});*/

const gridTemplateColumns = (columns) => {
  for (let elem of galleryPhotos) {
    elem.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }
};

const sizeGalleryController = (size, shiftDotX) => {
  if (app.clientWidth >= size) {
    if (shiftDotX <= 50) {
      gridTemplateColumns(4);
    }
    if (shiftDotX >= 50) {
      gridTemplateColumns(3);
    }
    if (shiftDotX >= 80) {
      gridTemplateColumns(2);
    }
    for (let elem of photo) {
      elem.style.height = heightPhoto + (shiftDotX / 4) + 'vw';
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
    for (let elem of photo) {
      elem.style.height = heightPhoto + (shiftDotX / 4) + 'vw';
    }
  }
};


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
    sizeGalleryController(1000, shiftDotX);
  };
  
  const stopScrollMove = () => {
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
    sizeGalleryController(999, shiftDotX);
  };
  
  const stopScrollMove = () => {
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


