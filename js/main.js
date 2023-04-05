
import { createMocks } from './data.js';
import { toggleActivityForm } from './form.js';
import { priceUiSlider } from './form-validate.js';

//Leaflet карта
import { initMap } from './map.js';

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    try {
      //Инициализируем карту
      initMap(createMocks);
    } catch(error) {
      //Форма не доступна
      toggleActivityForm(false, priceUiSlider.destroy);
    }
  });

});

