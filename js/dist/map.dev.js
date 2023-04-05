"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMap = void 0;

var _form = require("./form.js");

var _generateData = require("./generate-data.js");

//Блок куда вставляем карту
var mapBlockElement = document.querySelector('#map-canvas'); //Функция создаёт карту и инициализирует

var initMap = function initMap(data) {
  //получаем массив елементов data
  var everPopup = (0, _generateData.createCards)(data).childNodes;
  var popupElements = Array.from(everPopup); //строка адреса

  var addressElement = document.querySelector('[name="address"]');
  var map = L.map(mapBlockElement, //Опции карты
  {
    wheelPxPerZoomLevel: 60
  }).on('load', function () {
    //При загрузке карты, форма доступна
    (0, _form.toggleActivityForm)(true);
    map.scrollWheelZoom.enable();
  });
  map.setView({
    lat: 35.680052,
    lng: 139.764953
  }, 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 6,
    maxZoom: 15
  }).addTo(map); //Меняем главный маркер

  var markerIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  }); //Задаем главному маркеру параметры(опции)

  var mainMarker = L.marker({
    lat: 35.680052,
    lng: 139.764953
  }, {
    draggable: true,
    icon: markerIcon
  }); //Вставляем маркер в карту

  mainMarker.addTo(map); //Отлавливаем позицию маркера при движении

  mainMarker.on('moveend', function (evt) {
    var _evt$target$getLatLng = evt.target.getLatLng(),
        lat = _evt$target$getLatLng.lat,
        lng = _evt$target$getLatLng.lng; //Получаем координаты главой метки при перетаскивании


    addressElement.value = "\u0428\u0438\u0440\u043E\u0442\u0430 [".concat(lat.toFixed(4), "], \u0414\u043E\u043B\u0433\u043E\u0442\u0430 [").concat(lng.toFixed(4), "]");
  }); //Создаём метки из массива даты

  data.forEach(function (item, index) {
    var _item$location = item.location,
        lat = _item$location.lat,
        lng = _item$location.lng; //создаём метки на основе данных локации

    var marker = L.marker({
      lat: lat,
      lng: lng
    }, {
      draggable: false,
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [42, 42],
        iconAnchor: [26, 52]
      })
    });
    marker.addTo(map).bindPopup(popupElements[index]);
  });
};

exports.initMap = initMap;