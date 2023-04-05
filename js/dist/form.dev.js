"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleActivityForm = void 0;

var _formValidate = require("./form-validate.js");

var forms = ['ad-form', 'map__filters'].map(function (selector) {
  var form = document.querySelector(".".concat(selector)); //Возвращаем новый объект: каждой формы, все поля форм, и класс disabled формы

  return {
    form: form,
    parts: document.querySelectorAll('fieldset', 'select'),
    disabledClass: "".concat(selector, "--disabled")
  };
}); // Активирует и дезактивирует формы в зависимости от параметра true или false;

var toggleActivityForm = function toggleActivityForm(activate, onCloseHandler) {
  //Вызываем валидацию
  (0, _formValidate.initValidate)();
  forms.forEach(function (_ref) {
    var form = _ref.form,
        parts = _ref.parts,
        disabledClass = _ref.disabledClass;
    // Проверка на параметр
    form.classList[activate ? 'remove' : 'add'](disabledClass);
    parts.forEach(function (part) {
      part.disabled = !activate;
    });
  }); //проверяем если `false` - выполняем функцию

  if (!activate) {
    onCloseHandler();
  }
};

exports.toggleActivityForm = toggleActivityForm;