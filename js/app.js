const scrollBtn = document.querySelector('.slider__dot');
const slider = document.querySelector('.zoomer__slider');
const completedLine = document.querySelector('.left__line__completed');

scrollBtn.onmousedown = (e) => {
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