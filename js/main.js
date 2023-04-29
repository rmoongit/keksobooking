
import { toggleActivityForm } from './form.js';
import { getData } from './api.js';

//Leaflet карта
import { initMap } from './map.js';

//Форма не доступна
toggleActivityForm(false);

getData((data) => {
  //Инициализируем карту
  initMap(data.slice(0,10));
  //Форма доступна
  toggleActivityForm(true);
});

