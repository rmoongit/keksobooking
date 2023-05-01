const createUiSlider = (sliderElement, minPrice, sliderHandler) => {
  const STEP = 1000;

  // Создаём слайдер и привязываем к блоку цен
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
      to: function (value) {
        //выводим целое число без плавающей точки
        return value.toFixed(0);
      },

      from: function (value) {
        //получаем число
        return value;
      }
    }
  });

  //Выполняем передоваемую функцию на слайдере
  sliderElement.noUiSlider.on('slide', sliderHandler);

  return sliderElement.noUiSlider;
};

export { createUiSlider };
