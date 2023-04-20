"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postData = exports.getData = void 0;

var _util = require("./util.js");

//Получаем данные с сервера
var getData = function getData(onSuccess) {
  var getUrl = 'https://26.javascript.pages.academy/keksobooking/data';
  fetch(getUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    onSuccess(data);
  })["catch"](function () {
    //Ловим ошибку и показываем блок ошибки
    (0, _util.showAlert)('Server is not available (Сервер не доступен)');
  });
}; //Отправляем данные на сервер с методом 'POST'


exports.getData = getData;

var postData = function postData(body, unblockButton, onSuccess, onError) {
  var postUrl = 'https://26.javascript.pages.academy/keksobooking';
  fetch(postUrl, {
    method: 'POST',
    body: body,
    type: 'multipart/form-data'
  }).then(function (response) {
    //Проверка если ответ сервера "ок(200)"
    if (response.ok) {
      unblockButton();
      onSuccess();
    } else {
      onError();
    }
  })["catch"](function () {
    onError();
  });
};

exports.postData = postData;