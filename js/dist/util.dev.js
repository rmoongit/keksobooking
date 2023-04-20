"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomFloat = getRandomFloat;
exports.showError = exports.showSuccess = exports.getFixedNumber = exports.showAlert = exports.shuffledArray = exports.generateAvatar = exports.getNumberWithLeadZero = exports.getRandomArrayElement = exports.getRandomInteger = void 0;

var _form = require("./form.js");

var _map = require("./map.js");

var _formValidate = require("./form-validate.js");

var templateSuccess = document.querySelector('#success').content.querySelector('.success');
var templateError = document.querySelector('#error').content.querySelector('.error');
var body = document.querySelector('body');
var clone; //Нажатие на кнопку "Escape".

var isEscapeKey = function isEscapeKey(evt) {
  return evt.key === 'Escape';
}; // Функция генерирует случайное число от минимума(включая) до максимума


var getRandomInteger = function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}; // Функция генерирует случайные числа с плавающей точкой


exports.getRandomInteger = getRandomInteger;

function getRandomFloat(min, max) {
  var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var result = Math.random() * (max - min) + min;
  return +result.toFixed(decimals);
}

var getFixedNumber = function getFixedNumber(number) {
  return number.toFixed(6);
}; // Функция генерирует случайный элемент массива


exports.getFixedNumber = getFixedNumber;

var getRandomArrayElement = function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}; // Функция с ведущим нулём


exports.getRandomArrayElement = getRandomArrayElement;

var getNumberWithLeadZero = function getNumberWithLeadZero(num) {
  return "".concat(num < 10 ? '0' : '').concat(num);
}; // Функция генерирует строку с Аватркой


exports.getNumberWithLeadZero = getNumberWithLeadZero;

var generateAvatar = function generateAvatar(num) {
  var string = "img/avatars/user".concat(getNumberWithLeadZero(num), ".png");
  return string;
}; // Функция перемешивает наш массив


exports.generateAvatar = generateAvatar;

var shuffledArray = function shuffledArray(array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
};

exports.shuffledArray = shuffledArray;

var showAlert = function showAlert(message) {
  var alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(function () {
    alertContainer.remove();
  }, 5000);
}; //Покаываеи окно успешной отправки


exports.showAlert = showAlert;

var showSuccess = function showSuccess() {
  clone = templateSuccess.cloneNode(true);
  body.append(clone); //Очищаем поля форм и сбрасываем слайдер с картой

  _form.forms.forEach(function (item) {
    return item.form.reset();
  });

  (0, _map.resetMap)();
  (0, _formValidate.resetSlider)();
  document.addEventListener('keydown', closeOnEsc);
  clone.addEventListener('click', function () {
    //проверяем если елемент есть - удаляем
    if (clone) {
      clone.remove();
    }
  });
}; //Покаываеи окно если отправка не успешна


exports.showSuccess = showSuccess;

var showError = function showError() {
  clone = templateError.cloneNode(true);
  var errorButton = clone.querySelector('.error__button');
  body.append(clone);
  document.addEventListener('keydown', closeOnEsc);
  document.addEventListener('click', function (evt) {
    if (evt.target.closest('.error') || evt.target === errorButton) {
      clone.remove();
    }
  });
}; //Удаляем блок на нажатие 'Esc'


exports.showError = showError;

function closeOnEsc(evt) {
  if (isEscapeKey(evt)) {
    clone.remove();
  }
}