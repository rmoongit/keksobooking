"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUiSlider = void 0;

var createUiSlider = function createUiSlider(sliderElement, minPrice, sliderHandler) {
  var STEP = 1000; // Создаём слайдер и привязываем к блоку цен

  noUiSlider.create(sliderElement, {
    //Параметры слайдера
    range: {
      min: +minPrice.placeholder,
      max: 100000
    },
    start: 0,
    step: STEP,
    connect: 'lower',
    format: {
      to: function to(value) {
        //выводим целое число без плавающей точки
        return value.toFixed(0);
      },
      from: function from(value) {
        //получаем число
        return value;
      }
    }
  }); //Выполняем передоваемую функцию на слайдере

  sliderElement.noUiSlider.on('slide', sliderHandler);
  return sliderElement.noUiSlider;
};

exports.createUiSlider = createUiSlider;