"use strict";

var _form = require("./form.js");

var _formValidate = require("./form-validate.js");

var _api = require("./api.js");

var _map = require("./map.js");

//Leaflet карта
window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    try {
      //Инициализируем карту
      (0, _api.getData)(function (data) {
        (0, _map.initMap)(data.slice(0, 10));
      });
    } catch (error) {
      //Форма не доступна
      (0, _form.toggleActivityForm)(false, _formValidate.priceUiSlider.destroy);
    }
  });
});