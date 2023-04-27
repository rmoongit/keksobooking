"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterOffers = void 0;
var filtersElement = document.querySelector('.map__filters');
var filterControls = Array.from(filtersElement.children);
var DEFAULT_VALUE = 'any';
var housePrice = {
  low: {
    from: 0,
    to: 10000
  },
  middle: {
    from: 10000,
    to: 50000
  },
  high: {
    from: 50000,
    to: Infinity
  }
};
var filterRules = {
  'housing-type': function housingType(_ref, value) {
    var type = _ref.type;
    return value === type;
  },
  'housing-price': function housingPrice(_ref2, value) {
    var price = _ref2.price;
    return price >= housePrice[value].from && price < housePrice[value].to;
  },
  'housing-rooms': function housingRooms(_ref3, value) {
    var rooms = _ref3.rooms;
    return value === rooms.toString();
  },
  'housing-guests': function housingGuests(_ref4, value) {
    var guests = _ref4.guests;
    return value === guests.toString();
  },
  'housing-features': function housingFeatures(_ref5) {
    var features = _ref5.features;

    if (!features) {
      return false;
    }

    var checkedCheckboxes = Array.from(filtersElement.querySelectorAll('[type="checkbox"]:checked'));
    return checkedCheckboxes.every(function (_ref6) {
      var value = _ref6.value;
      return features.some(function (feature) {
        return feature === value;
      });
    });
  }
};

var filterOffers = function filterOffers(_ref7) {
  var offer = _ref7.offer;
  return filterControls.every(function (_ref8) {
    var value = _ref8.value,
        id = _ref8.id;
    return value === DEFAULT_VALUE || filterRules[id](offer, value);
  });
};

exports.filterOffers = filterOffers;