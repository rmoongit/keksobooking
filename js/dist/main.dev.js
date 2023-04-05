"use strict";

var _data = require("./data.js");

var _form = require("./form.js");

var _formValidate = require("./form-validate.js");

var _map = require("./map.js");

//Leaflet карта
window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    try {
      //Инициализируем карту
      (0, _map.initMap)(_data.createMocks);
    } catch (error) {
      //Форма не доступна
      (0, _form.toggleActivityForm)(false, _formValidate.priceUiSlider.destroy);
    }
  });
});