import { toggleActivityForm } from './forms.js';
import { getData } from './api.js';
import { initAdForm } from './ad-form.js';
//Leaflet карта
import { initMap } from './map.js';

//Форма не доступна
toggleActivityForm(false);

getData((data) => {
  //Инициализируем карту
  initMap(data.slice(0, 10));
  //Инициализируем форму отправки
  initAdForm();
  //Форма доступна
  toggleActivityForm(true);
});
