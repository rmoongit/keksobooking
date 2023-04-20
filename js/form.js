

import { initValidate, resetSlider } from './form-validate.js';
import { resetMap } from './map.js';

const reset = document.querySelector('.ad-form__reset');


const forms = ['ad-form', 'map__filters'].map((selector) => {
  const form = document.querySelector(`.${selector}`);
  //Возвращаем новый объект: каждой формы, все поля форм, и класс disabled формы
  return {
    form,
    parts: document.querySelectorAll('fieldset', 'select'),
    disabledClass: `${selector}--disabled`
  };
});

// Активирует и дезактивирует формы в зависимости от параметра true или false;
const toggleActivityForm = (activate, onCloseHandler) => {
//Вызываем валидацию
  initValidate();

  forms.forEach(({form, parts, disabledClass}) => {

    // Проверка на параметр
    form.classList[activate ? 'remove' : 'add'](disabledClass);

    parts.forEach((part) => {
      part.disabled = !activate;
    });

    //Сброс формы на кнопку reset
    reset.addEventListener('click', (evt) => {
      evt.preventDefault();

      form.reset();

      resetSlider();
      resetMap();
    });

  });

  //проверяем если `false` - выполняем функцию
  if (!activate) {
    onCloseHandler();
  }
};

export { toggleActivityForm, forms };
