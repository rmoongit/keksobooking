"use strict";

var _form = require("./form.js");

var _api = require("./api.js");

var _map = require("./map.js");

//Leaflet карта
//Форма не доступна
(0, _form.toggleActivityForm)(false);
(0, _api.getData)(function (data) {
  //Инициализируем карту
  (0, _map.initMap)(data.slice(0, 10)); //Форма доступна

  (0, _form.toggleActivityForm)(true);
});