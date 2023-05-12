import { createCard } from './create-card.js';
import { getFixedNumber } from './util.js';
import { initFilters } from './filter-map.js';

//Блок куда вставляем карту
const mapBlockElement = document.querySelector('#map-canvas');
//строка адреса
const addressElement = document.querySelector('[name="address"]');

const mapZoom = 13;

const defaultCoordinates = {
  lat: 35.680052,
  lng: 139.764953
};

//Создаём карту
const map = L.map(
  mapBlockElement,
  //Опции карты
  {
    wheelPxPerZoomLevel: 60
  }
).on('load', () => {
  map.scrollWheelZoom.enable();
});

//Меняем главный маркер
const markerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

//Задаем главному маркеру параметры(опции)
const mainMarker = L.marker(
  defaultCoordinates,

  {
    draggable: true,
    icon: markerIcon
  }
);

const markerGroup = L.layerGroup().addTo(map);

//Показываем координаты метки
const setMarkerValue = () => {
  addressElement.value = `${getFixedNumber(defaultCoordinates.lat)}, ${getFixedNumber(defaultCoordinates.lng)}`;

  //Отлавливаем позицию маркера при движении
  mainMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    //Получаем координаты главой метки при перетаскивании
    addressElement.value = `${getFixedNumber(lat)}, ${getFixedNumber(lng)}`;
  });
};

//Создаёт кастомные метки
const createMarker = (createTemplate) => {
  const { lat, lng } = createTemplate.location;

  const marker = L.marker(
    {
      lat: getFixedNumber(lat),
      lng: getFixedNumber(lng)
    },

    {
      draggable: false,
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [26, 46]
      })
    }
  );

  marker.addTo(markerGroup).bindPopup(createCard(createTemplate));
};

//Вывод данных полученых в карту
const renderMap = (data) => {
  markerGroup.clearLayers();

  data.forEach((dataItem) => {
    createMarker(dataItem);
  });
};

//Функция Инициализирует карту
const initMap = (data) => {
  //Задаём параметры карты
  map.setView(defaultCoordinates, mapZoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 6,
    maxZoom: 15
  }).addTo(map);

  //Вставляем основной маркер на карту
  mainMarker.addTo(map);

  //Устанавливаем значение маркера
  setMarkerValue();

  //Рендерим данные и создаём метки
  initFilters(data);
};
//Сбрасываем параметры карты
const resetMap = () => {
  map.setView(defaultCoordinates, mapZoom);

  mainMarker.setLatLng(defaultCoordinates);

  map.closePopup();
};

export { initMap, resetMap, renderMap };
