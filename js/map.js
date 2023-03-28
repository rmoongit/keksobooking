import { toggleActivityForm } from './form.js';
import { createCards } from './generate-data.js';

//Блок куда вставляем карту
const mapBlockElement = document.querySelector('#map-canvas');

//Функция создаёт карту и инициализирует
const initMap = (data) => {
  //получаем массив елементов data
  const everPopup = createCards(data).childNodes;
  const popupElements = Array.from(everPopup);


  //строка адреса
  const addressElement = document.querySelector('[name="address"]');

  const map = L.map(mapBlockElement,
    //Опции карты
    {
      wheelPxPerZoomLevel: 60,
    },
  )
    .on('load', () => {
    //При загрузке карты, форма доступна
      toggleActivityForm(true);
      map.scrollWheelZoom.enable();
    });

  map.setView({
    lat: 35.680052,
    lng:  139.764953,
  }, 10);


  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 6,
      maxZoom: 15,
    },
  ).addTo(map);

  //Меняем главный маркер
  const markerIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  //Задаем главному маркеру параметры(опции)
  const mainMarker = L.marker(
    {
      lat: 35.680052,
      lng:  139.764953,
    },
    {
      draggable: true,
      icon: markerIcon,
    },
  );
    //Вставляем маркер в карту
  mainMarker.addTo(map);

  //Отлавливаем позицию маркера при движении
  mainMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    //Получаем координаты главой метки при перетаскивании
    addressElement.value = `Широта [${lat.toFixed(4)}], Долгота [${lng.toFixed(4)}]`;
  });

  //Создаём метки из массива даты
  data.forEach((item, index) => {
    const {lat, lng} = item.location;

    //создаём метки на основе данных локации
    const marker = L.marker({
      lat: lat,
      lng: lng
    },
    {
      draggable: false,
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [42, 42],
        iconAnchor: [26, 52],
      })
    }

    );

    marker
      .addTo(map)
      .bindPopup(
        popupElements[index]

      );
  });

};

export { initMap };


