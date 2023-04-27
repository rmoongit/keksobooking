"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFilter = void 0;
var filtersElement = document.querySelector('.map__filters');
var filterControls = Array.from(filtersElement.children);
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

var initFilter = function initFilter(data) {
  filterControls.forEach(function (select) {
    select.addEventListener('change', function (evt) {
      var optionValue = evt.target.value;
      data.filter(function (item) {
        var _item$offer = item.offer,
            type = _item$offer.type,
            price = _item$offer.price,
            rooms = _item$offer.rooms,
            guests = _item$offer.guests;
        var passFilter = true; // проверяем каждое свойство объекта на соответствие фильтру

        if (optionValue !== 'any' && type !== optionValue) {
          passFilter = false;
        } // пример сравнения цен


        if (optionValue === 'low' && price >= housePrice.low.to) {
          passFilter = false;
        } else if (optionValue === 'middle' && (price < 10000 || price > 50000)) {
          passFilter = false;
        } else if (optionValue === 'high' && price <= 50000) {
          passFilter = false;
        } else {
          passFilter = true;
        }

        return passFilter; // вернем только объекты, прошедшие все фильтры
      });
    });
  });
};

exports.initFilter = initFilter;