var PIN_WIDTH = 32;
var IMAGE_MIN_WIDTH = 131;
var TABLET_WIDTH = 768;
var DESKTOP_WIDTH = 1300;
var instanceWrapperDesc = document.querySelector('.instance');
var instanceWrapperTab = document.querySelector('.instance__column-slider');
var startBtn = instanceWrapperTab.querySelector('.range-slider__start');
var finishBtn = instanceWrapperTab.querySelector('.range-slider__finish');
var beforeImg = instanceWrapperTab.querySelector('.instance__photo-wrapper--fat-cat');
var pin = instanceWrapperTab.querySelector('.range-slider__pin');
var line = instanceWrapperTab.querySelector('.range-slider__scale');
var setBackground = function () {
  if (window.innerWidth>=TABLET_WIDTH && window.innerWidth<DESKTOP_WIDTH && instanceWrapperTab) {
    instanceWrapperTab.style.backgroundImage = "linear-gradient(to left, #eaeaea " + (pin.getBoundingClientRect().left + PIN_WIDTH/2) + "px, #f2f2f2 " + (pin.getBoundingClientRect().left + PIN_WIDTH/2) + "px)";
  }
  if (window.innerWidth>=DESKTOP_WIDTH && instanceWrapperTab) {
    instanceWrapperTab.style.backgroundImage = "linear-gradient(to left, #eaeaea " + (pin.getBoundingClientRect().left + PIN_WIDTH/2) + "px, #f2f2f2 " + (pin.getBoundingClientRect().left + PIN_WIDTH/2) + "px)";
  }
};
setBackground();
startBtn.addEventListener('click', function () {
  beforeImg.classList.remove('instance__photo-wrapper--disappearance');
  beforeImg.classList.add('instance__photo-wrapper--appearance');
  pin.classList.remove('range-slider__pin--after');
  pin.classList.add('range-slider__pin--before');
  beforeImg.style.width = '100%';
  setBackground();
});
finishBtn.addEventListener('click', function () {
  beforeImg.classList.remove('instance__photo-wrapper--appearance');
  beforeImg.classList.add('instance__photo-wrapper--disappearance');
  pin.classList.remove('.range-slider__pin--before');
  pin.classList.add('range-slider__pin--after');
  beforeImg.style.width = '0';
  setBackground();
});


