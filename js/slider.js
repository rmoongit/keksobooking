import { priceFieldElement } from './form-validate.js';

const sliderElement = document.querySelector('.ad-form__slider');

const initNoUiSlider = () => {

  // Создаём слайдер и привязываем к блоку цен
  noUiSlider.create(sliderElement, {

    //Параметры слайдера
    range: {
      min: +priceFieldElement.placeholder,
      max: 100000,
    },
    start: 0,
    connect: 'lower',

    format: {
      to: function(value) {
        //проверка на целостность числа
        return  Number.isInteger(value) ?  value.toFixed(0) : value.toFixed(0);
      },

      from: function(value) {
        //получаем число
        return value;
      },
    }

  });

  //Выводим значение слайдера
  sliderElement.noUiSlider.on('update', () => {
    priceFieldElement.value = sliderElement.noUiSlider.get();
  });

};

//Доделать слайдер!

export { initNoUiSlider, sliderElement };

