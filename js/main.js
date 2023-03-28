
import { createMocks } from './data.js';
import { toggleActivityForm } from './form.js';

//NoUiSlider
import   { initNoUiSlider } from './slider.js';

//Leaflet карта
import { initMap } from './map.js';

//Валидация Формы
import './form-validate.js';

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    //Форма не доступна
    toggleActivityForm(false);

    //Инициализируем карту
    initMap(createMocks);

    //Инициализируем слайдер
    initNoUiSlider();
  });

});

//6. С помощью API карт реализуйте показ балуна с подробной информацией об объявлении. Учтите нюансы поведения и ограничения для обычных меток и главной.
