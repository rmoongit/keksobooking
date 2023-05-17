import { toggleActivityForm } from './forms.js';
import { getData } from './api.js';
import { initAdForm } from './ad-form.js';
//Leaflet карта
import { initMap } from './map.js';
import { initImageControl } from './upload-photo.js';

const choser1 = document.querySelector('#avatar');
const preview1 = document.querySelector('.ad-form-header__preview img');

initImageControl(choser1, preview1);

//Форма не доступна
toggleActivityForm(false);

getData((data) => {
  //Инициализируем карту
  initMap(data);
  //Инициализируем форму отправки
  initAdForm();
  //Форма доступна
  toggleActivityForm(true);
});
