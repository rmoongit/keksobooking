"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priceUiSlider = exports.initValidate = void 0;

var _mocks = require("./mocks.js");

var _slider = require("./slider.js");

var form = document.querySelector('.ad-form');
var titleFieldElement = form.querySelector('[name="title"]');
var priceFieldElement = form.querySelector('[name="price"]'); //slider

var sliderElement = document.querySelector('.ad-form__slider'); //roomsFields

var roomsFieldElement = form.querySelector('[name="rooms"]');
var capacityFieldElement = form.querySelector('[name="capacity"]');
var typeFieldElement = form.querySelector('[name="type"]'); //timeFields

var timeFieldset = document.querySelector('.ad-form__element--time');
var timeIn = document.querySelector('[name="timein"]');
var timeOut = document.querySelector('[name="timeout"]');
var RoomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
var limit = 100000;
var pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--error'
});

var initValidate = function initValidate() {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault(); //Заглушку потом убрать.

    var valid = pristine.validate();

    if (valid) {
      console.log('Провалидировано');
    } else {
      throw new Error('Форма не валидна');
    }
  });
}; //---------Валидация Заголовка------------//
// Проверка поля заголовка объявления


exports.initValidate = initValidate;

var checkStringLength = function checkStringLength(value) {
  var text = value.split(' ');
  return text.every(function (item) {
    return item.length <= 100;
  });
}; //---------Валидация Гостей и Комнат------------//
// Проверка на количество гостей


var validCapacity = function validCapacity() {
  if (RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value)) {
    return true;
  }

  return false;
}; // Формируем сообщение в зависимости от выбора комнат


var validCapacityMessage = function validCapacityMessage() {
  var value = roomsFieldElement.value;

  switch (value) {
    case '1':
      return "".concat(value, " \u043A\u043E\u043C\u043D\u0430\u0442\u0430 \u0434\u043B\u044F ").concat(value, " \u043A\u043E\u0442\u0430");

    case '2':
      return "".concat(value, " ").concat(value === '2' ? 'комнаты' : 'комнат', " \u0434\u043B\u044F ").concat(value, " ").concat(value === '2' ? 'котов' : 'кота');

    case '3':
      return "".concat(value, " ").concat(value === '3' ? 'комнаты' : 'комнат', " \u0434\u043B\u044F ").concat(value, " ").concat(value === '3' ? 'котов' : 'кота');

    case '100':
      return "".concat(value, " \u043A\u043E\u043C\u043D\u0430\u0442 \u043D\u0435 \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0432, \u0430 \u0434\u043B\u044F \u043F\u0442\u0435\u043D\u0446\u043E\u0432.");
  }
}; //Создаём и инициализируем слайдер!


var priceUiSlider = (0, _slider.createUiSlider)(sliderElement, priceFieldElement, function () {
  priceFieldElement.value = priceUiSlider.get();
  pristine.validate(priceFieldElement);
}); //---------Валидация Типа жилья------------//
//Задаём минимальную цену - если выбран данный ${target}

exports.priceUiSlider = priceUiSlider;
typeFieldElement.addEventListener('change', function (evt) {
  for (var key in _mocks.TYPE_FLATS) {
    if (evt.target.value === key) {
      priceFieldElement.value = '';
      priceFieldElement.placeholder = "".concat(_mocks.TYPE_FLATS[key].price); //Обновляем значение слайдера по объекту

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: _mocks.TYPE_FLATS[key].price,
          max: _mocks.TYPE_FLATS[key].max ? _mocks.TYPE_FLATS[key].max : 100000
        },
        step: _mocks.TYPE_FLATS[key].step
      });
      sliderElement.noUiSlider.set(_mocks.TYPE_FLATS[key].price);
    }
  }
}); //Проверяем заданную ценну с текущей

var checkPricePlaceholder = function checkPricePlaceholder() {
  var placeholder = Number(priceFieldElement.placeholder);
  priceFieldElement.value = parseInt(priceFieldElement.value, 10 || 0);
  return priceFieldElement.value >= placeholder && priceFieldElement.value <= limit;
}; // Получаем сообщение ошибки цены


var getPriceMessage = function getPriceMessage() {
  if (priceFieldElement.value >= limit) {
    return 'Максимальная цена 100 000';
  }

  return "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043D\u0430 ".concat(priceFieldElement.placeholder);
}; //---------Валидация Время заезда------------//
//Проверяем время заезда между собой


timeFieldset.addEventListener('change', function (evt) {
  if (evt.target.value !== timeIn.value) {
    timeIn.value = evt.target.value;
  }

  if (evt.target.value !== timeOut.value) {
    timeOut.value = evt.target.value;
  }
}); // Валидация заголовка

pristine.addValidator(titleFieldElement, checkStringLength, 'Максимальная длина 100 символов.'); // Валидация цены

pristine.addValidator(priceFieldElement, checkPricePlaceholder, getPriceMessage); // Валидация гостей и комнат

pristine.addValidator(roomsFieldElement, validCapacity, validCapacityMessage);
capacityFieldElement.addEventListener('change', function () {
  pristine.validate(roomsFieldElement);
});