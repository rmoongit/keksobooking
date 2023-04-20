
import { toggleActivityForm } from './form.js';
import { priceUiSlider } from './form-validate.js';
import { getData } from './api.js';

//Leaflet карта
import { initMap } from './map.js';

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    try {
      //Инициализируем карту
      getData((data) => {
        initMap(data.slice(0, 10));
      });

    } catch(error) {
      //Форма не доступна
      toggleActivityForm(false, priceUiSlider.destroy);
    }
  });

});

//Доделать ОТправку формы!!!
//Доделать ОТправку формы!!!
//Доделать ОТправку формы!!!
//Доделать ОТправку формы!!!
