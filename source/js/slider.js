'use strict';
(function () {
  var PIN_WIDTH = 32;
  var MOBILE_WIDTH = 320;
  var TABLET_WIDTH = 768;
  var DESKTOP_WIDTH = 1300;
  var DESKTOP_LENGTH_DIFFERENCE = 167;
  var TABLET_LENGTH_DIFFERENCE = 142;
  var TABLET_BACKGROUND_DIFFERENCE = 186;
  var MIN_VALUE = 0;
  var MAX_PERCENTAGE = 100;
  var BEFORE_IMG_MAX_WIDTH = 566;
  var MAX_TABLET_GRADIENT_BOUNDARY = 582;
  var MAX_DESKTOP_GRADIENT_BOUNDARY = 565;
  var MIN_TABLET_GRADIENT_BOUNDARY = 184;
  var MIN_DESKTOP_GRADIENT_BOUNDARY = 166;
  var instanceWrapperTab = document.querySelector('.instance__column-slider');
  var startBtn = instanceWrapperTab.querySelector('.range-slider__start');
  var finishBtn = instanceWrapperTab.querySelector('.range-slider__finish');
  var beforeImg = instanceWrapperTab.querySelector('.instance__photo-wrapper--fat-cat');
  var pin = instanceWrapperTab.querySelector('.range-slider__pin');
  var line = instanceWrapperTab.querySelector('.range-slider__scale');
  var maxValue = Math.round((line.offsetWidth - PIN_WIDTH) * MAX_PERCENTAGE / line.offsetWidth);

  if (document.body.clientWidth >= TABLET_WIDTH) {
    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var scale = line.offsetWidth;
      var beforeImgMaxWidth = beforeImg.offsetWidth;
      var startCoord = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;
        var changedValue = ((pin.offsetLeft - shift) * MAX_PERCENTAGE / scale);
        changedValue = changedValue.toFixed(1);
        if (changedValue > maxValue) {
          changedValue = maxValue;
        } else if (changedValue < MIN_VALUE) {
          changedValue = MIN_VALUE;
        }
        pin.style.left = changedValue + '%';

        if (document.body.clientWidth >= TABLET_WIDTH) {
          var changedTabletWidth = pin.offsetLeft - shift + TABLET_LENGTH_DIFFERENCE;
          var changedBackgroundWidth = pin.offsetLeft - shift + TABLET_BACKGROUND_DIFFERENCE;
          beforeImg.style.width = changedTabletWidth + 'px';
          instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + changedBackgroundWidth + 'px, #eaeaea ' + changedBackgroundWidth + 'px)';
        };

        if (document.body.clientWidth >= DESKTOP_WIDTH) {
          var changedDecktopWidth = pin.offsetLeft - shift + DESKTOP_LENGTH_DIFFERENCE;
          beforeImg.style.width = changedDecktopWidth + 'px';
          instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + changedDecktopWidth + 'px, #eaeaea ' + changedDecktopWidth + 'px)';
        };
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  if (startBtn) {
    startBtn.addEventListener('click', function () {

      if (document.body.clientWidth >= MOBILE_WIDTH) {
        beforeImg.classList.remove('instance__photo-wrapper--disappearance');
        beforeImg.classList.add('instance__photo-wrapper--appearance');
        pin.classList.remove('range-slider__pin--after');
        pin.classList.add('range-slider__pin--before');
        beforeImg.style.width = MAX_PERCENTAGE + '%';
      };

      if (document.body.clientWidth >= TABLET_WIDTH) {
        instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + MAX_TABLET_GRADIENT_BOUNDARY + 'px, #eaeaea ' + MAX_TABLET_GRADIENT_BOUNDARY + 'px)';
        beforeImg.style.width = BEFORE_IMG_MAX_WIDTH + 'px';
        pin.style.left = maxValue + '%';
      };
      if (document.body.clientWidth >= DESKTOP_WIDTH) {
        instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + MAX_DESKTOP_GRADIENT_BOUNDARY + 'px, #eaeaea ' + MAX_DESKTOP_GRADIENT_BOUNDARY + 'px)';
        beforeImg.style.width = BEFORE_IMG_MAX_WIDTH + 'px';
        pin.style.left = maxValue + '%';
      };
    });
  };

  if (finishBtn) {
    finishBtn.addEventListener('click', function () {

      if (document.body.clientWidth >= MOBILE_WIDTH) {
      beforeImg.classList.remove('instance__photo-wrapper--appearance');
      beforeImg.classList.add('instance__photo-wrapper--disappearance');
      pin.classList.remove('.range-slider__pin--before');
      pin.classList.add('range-slider__pin--after');
      beforeImg.style.width = MIN_VALUE;
      };

      if (document.body.clientWidth >= TABLET_WIDTH) {
        instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + MIN_TABLET_GRADIENT_BOUNDARY + 'px, #eaeaea ' + MIN_TABLET_GRADIENT_BOUNDARY + 'px)';
        beforeImg.style.width = MIN_VALUE;
        pin.style.left = MIN_VALUE;
      };
      if (document.body.clientWidth >= DESKTOP_WIDTH) {
        instanceWrapperTab.style.backgroundImage = 'linear-gradient(to right, #f2f2f2 ' + MIN_DESKTOP_GRADIENT_BOUNDARY + 'px, #eaeaea ' + MIN_DESKTOP_GRADIENT_BOUNDARY + 'px)';
        beforeImg.style.width = MIN_VALUE;
        pin.style.left = MIN_VALUE;
      };
    });
  }
  })();
