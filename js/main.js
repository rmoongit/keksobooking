import { generateCards } from './generate-data.js';
import { createSimilarObjects } from './data.js';

//Leaflet карта
import { initMap } from './map.js';

//Валидация Формы
import './form-validate.js';

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    //Генерируем Объекты
    generateCards(createSimilarObjects);

    //Инициализируем карту
    initMap();
  });

});

