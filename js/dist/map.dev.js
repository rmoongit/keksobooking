"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetMap = exports.initMap = void 0;

var _form = require("./form.js");

var _generateData = require("./generate-data.js");

var _util = require("./util.js");

var mapZoom = 13;
var defaultCoordinates = {
  lat: 35.680052,
  lng: 139.764953
}; //Блок куда вставляем карту

var mapBlockElement = document.querySelector('#map-canvas'); //строка адреса

var addressElement = document.querySelector('[name="address"]'); //Создаём карту

var map = L.map(mapBlockElement, //Опции карты
{
  wheelPxPerZoomLevel: 60
}).on('load', function () {
  //При загрузке карты, форма доступна
  (0, _form.toggleActivityForm)(true);
  map.scrollWheelZoom.enable();
}); //Меняем главный маркер

var markerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
}); //Задаем главному маркеру параметры(опции)

var mainMarker = L.marker({
  lat: defaultCoordinates.lat,
  lng: defaultCoordinates.lng
}, {
  draggable: true,
  icon: markerIcon
}); //Показываем координаты метки

var setMarkerValue = function setMarkerValue() {
  addressElement.value = "".concat((0, _util.getFixedNumber)(defaultCoordinates.lat), ", ").concat((0, _util.getFixedNumber)(defaultCoordinates.lng)); //Отлавливаем позицию маркера при движении

  mainMarker.on('move', function (evt) {
    var _evt$target$getLatLng = evt.target.getLatLng(),
        lat = _evt$target$getLatLng.lat,
        lng = _evt$target$getLatLng.lng; //Получаем координаты главой метки при перетаскивании


    addressElement.value = "".concat((0, _util.getFixedNumber)(lat), ", ").concat((0, _util.getFixedNumber)(lng));
  });
}; //Функция Инициализирует карту


var initMap = function initMap(data) {
  //получаем массив елементов data
  var popupElements = Array.from((0, _generateData.createCards)(data).childNodes); //Задаём параметры карты

  map.setView({
    lat: defaultCoordinates.lat,
    lng: defaultCoordinates.lng
  }, mapZoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 6,
    maxZoom: 15
  }).addTo(map); //Вставляем маркер в карту

  mainMarker.addTo(map);
  var markerGroup = L.layerGroup().addTo(map); //Создаём метки из массива даты

  data.forEach(function (item, index) {
    var _item$location = item.location,
        lat = _item$location.lat,
        lng = _item$location.lng; //подставляем метки на основе данных локации

    var marker = L.marker({
      lat: (0, _util.getFixedNumber)(lat),
      lng: (0, _util.getFixedNumber)(lng)
    }, {
      draggable: false,
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [26, 46]
      })
    });
    marker.addTo(markerGroup).bindPopup(popupElements[index]);
  });
  setMarkerValue();
}; //Сбрасываем параметры карты


exports.initMap = initMap;

var resetMap = function resetMap() {
  map.setView({
    lat: defaultCoordinates.lat,
    lng: defaultCoordinates.lng
  }, mapZoom);
  mainMarker.setLatLng({
    lat: defaultCoordinates.lat,
    lng: defaultCoordinates.lng
  });
  map.closePopup();
};

exports.resetMap = resetMap;