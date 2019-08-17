var exampleWrapperDesc = document.querySelector('.instance');
var exampleWrapperTab = document.querySelector('.instance__column-slider');
var beforeBtn = exampleWrapperTab.querySelector('.range-slider__start');
var afterBtn = exampleWrapperTab.querySelector('.range-slider__finish');
var beforeImg = exampleWrapperTab.querySelector('.instance__photo-wrapper--fat-cat');
var pin = exampleWrapperTab.querySelector('.range-slider__pin');
var line = exampleWrapperTab.querySelector('.range-slider__scale');

beforeBtn.addEventListener('click', function () {
  beforeImg.classList.remove('instance__photo-wrapper--disappearance');
  beforeImg.classList.add('instance__photo-wrapper--appearance');
  pin.classList.remove('range-slider__pin--after');
  pin.classList.add('range-slider__pin--before');
  beforeImg.style.width = '100%';
});
afterBtn.addEventListener('click', function () {
  beforeImg.classList.remove('instance__photo-wrapper--appearance');
  beforeImg.classList.add('instance__photo-wrapper--disappearance');
  pin.classList.remove('.range-slider__pin--before');
  pin.classList.add('range-slider__pin--after');
  beforeImg.style.width = '0';
});
