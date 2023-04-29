
import { createCard } from './create-card.js';
import { getFixedNumber } from './util.js';

const mapZoom = 13;

const defaultCoordinates = {
  lat: 35.680052,
  lng:  139.764953,
};

//Блок куда вставляем карту
const mapBlockElement = document.querySelector('#map-canvas');
//строка адреса
const addressElement = document.querySelector('[name="address"]');

//Создаём карту
const map = L.map(mapBlockElement,
  //Опции карты
  {
    wheelPxPerZoomLevel: 60,
  },
)

  .on('load', () => {
    map.scrollWheelZoom.enable();
  });

//Меняем главный маркер
const markerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//Задаем главному маркеру параметры(опции)
const mainMarker = L.marker(defaultCoordinates,

  {
    draggable: true,
    icon: markerIcon,
  },
);

//Показываем координаты метки
const setMarkerValue = () => {
  addressElement.value = `${getFixedNumber(defaultCoordinates.lat)}, ${getFixedNumber(defaultCoordinates.lng)}`;

  //Отлавливаем позицию маркера при движении
  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    //Получаем координаты главой метки при перетаскивании
    addressElement.value = `${getFixedNumber(lat)}, ${getFixedNumber(lng)}`;
  });
};

//Функция Инициализирует карту
const initMap = (data) => {

  //Задаём параметры карты
  map.setView(defaultCoordinates, mapZoom);


  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 6,
      maxZoom: 15,
    },
  ).addTo(map);

  //Вставляем маркер в карту
  mainMarker.addTo(map);

  const markerGroup = L.layerGroup().addTo(map);

  //Создаём метки из массива даты
  data.forEach((cardItem) => {
    const {lat, lng} = cardItem.location;


    //подставляем метки на основе данных локации
    const marker = L.marker({
      lat: getFixedNumber(lat),
      lng: getFixedNumber(lng),
    },

    {
      draggable: false,
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [26, 46],
      })
    }

    );

    marker
      .addTo(markerGroup)
      .bindPopup(createCard(cardItem));
  });

  setMarkerValue();
};

//Сбрасываем параметры карты
const resetMap = () => {

  map.setView(
    {
      lat: defaultCoordinates.lat,
      lng: defaultCoordinates.lng,
    }, mapZoom);

  mainMarker.setLatLng(
    {
      lat: defaultCoordinates.lat,
      lng: defaultCoordinates.lng,
    }
  );

  map.closePopup();
};

export { initMap, resetMap };


