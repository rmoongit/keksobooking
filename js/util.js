import { forms } from './forms.js';

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

let cloneElement;

//Нажатие на кнопку "Escape".
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция генерирует случайное число от минимума(включая) до максимума
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// Функция генерирует случайные числа с плавающей точкой
function getRandomFloat(min, max, decimals = 1) {
  const result = Math.random() * (max - min) + min;

  return +result.toFixed(decimals);
}

const getFixedNumber = (number) => number.toFixed(6);

// Функция генерирует случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция с ведущим нулём
const getNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;

// Функция генерирует строку с Аватркой
const generateAvatar = (num) => {
  const string = `img/avatars/user${getNumberWithLeadZero(num)}.png`;

  return string;
};

// Функция перемешивает наш массив
const shuffledArray = (array) => array.sort(() => Math.random() - 0.5);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
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

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

//Покаываеи окно успешной отправки
const showSuccess = () => {
  cloneElement = templateSuccess.cloneNode(true);

  body.append(cloneElement);
  //очищаем поля форм
  forms.forEach(({ formElement }) => formElement.reset());

  document.addEventListener('keydown', closeOnEsc);
  cloneElement.addEventListener('click', () => {
    //проверяем если елемент есть - удаляем
    if (cloneElement) {
      cloneElement.remove();
    }
  });
};

//Покаываеи окно если отправка не успешна
const showError = () => {
  cloneElement = templateError.cloneNode(true);
  const errorButton = cloneElement.querySelector('.error__button');

  body.append(cloneElement);

  document.addEventListener('keydown', closeOnEsc);
  document.addEventListener('click', (evt) => {
    if (evt.target.closest('.error') || evt.target === errorButton) {
      cloneElement.remove();
    }
  });
};

//Удаляем блок на нажатие 'Esc'
function closeOnEsc(evt) {
  if (isEscapeKey(evt)) {
    cloneElement.remove();
  }
}

//Функция Устранение дребезга
const debounce = (callback, timer) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timer);
  };
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getNumberWithLeadZero,
  generateAvatar,
  shuffledArray,
  showAlert,
  getFixedNumber,
  showSuccess,
  showError,
  debounce
};
