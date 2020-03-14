'use strict';
(function () {
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
  var maxValue = Math.round((line.offsetWidth - PIN_WIDTH) * 100 / line.offsetWidth);


  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var scale = line.offsetWidth;
    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;
      var changedValue = ((pin.offsetLeft - shift) * 100 / scale);
      changedValue = changedValue.toFixed(1);
      if (changedValue > maxValue) {
        changedValue = maxValue;
      } else if (changedValue < 0) {
        changedValue = 0;
      }
      pin.style.left = changedValue + '%';
      beforeImg.style.width = changedValue + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  if (startBtn) {
    startBtn.addEventListener('click', function () {
      beforeImg.classList.remove('instance__photo-wrapper--disappearance');
      beforeImg.classList.add('instance__photo-wrapper--appearance');
      pin.classList.remove('range-slider__pin--after');
      pin.classList.add('range-slider__pin--before');
      beforeImg.style.width = '100%';
      // setBackground();
    });
  };

  finishBtn.addEventListener('click', function () {
    beforeImg.classList.remove('instance__photo-wrapper--appearance');
    beforeImg.classList.add('instance__photo-wrapper--disappearance');
    pin.classList.remove('.range-slider__pin--before');
    pin.classList.add('range-slider__pin--after');
    beforeImg.style.width = '0';
    // setBackground();
  });

})();

