"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forms = exports.toggleActivityForm = void 0;

var _formValidate = require("./form-validate.js");

var _map = require("./map.js");

var reset = document.querySelector('.ad-form__reset');
var forms = ['.ad-form', '.map__filters'].map(function (selector) {
  var form = document.querySelector("".concat(selector)); //Возвращаем новый объект: каждой формы, все поля форм, и класс disabled формы

  return {
    form: form,
    parts: form.querySelectorAll('fieldset, select'),
    disabledClass: "".concat(selector, "--disabled")
  };
}); // Активирует и дезактивирует формы в зависимости от параметра true или false;

exports.forms = forms;

var toggleActivityForm = function toggleActivityForm(activate) {
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
    }); //Сброс формы на кнопку reset

    reset.addEventListener('click', function (evt) {
      evt.preventDefault();
      form.reset();
      (0, _formValidate.resetSlider)();
      (0, _map.resetMap)();
    });
  });
};

exports.toggleActivityForm = toggleActivityForm;