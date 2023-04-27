"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOffer = void 0;

var _form = require("./form.js");

var _formValidate = require("./form-validate.js");

var _api = require("./api.js");

var _filterMap = require("./filter-map.js");

var _map = require("./map.js");

//Leaflet карта
var renderOffer = function renderOffer() {
  var filterOffers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Boolean;

  try {
    //Инициализируем карту
    (0, _api.getData)(function (data) {
      (0, _map.initMap)(data.slice(0, 10));
    });
  } catch (error) {
    //Форма не доступна
    (0, _form.toggleActivityForm)(false, _formValidate.priceUiSlider.destroy);
  }
};

exports.renderOffer = renderOffer;