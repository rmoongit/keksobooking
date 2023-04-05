import { TYPE_FLATS } from './mocks.js';
import { createUiSlider } from './slider.js';

const form = document.querySelector('.ad-form');

const titleFieldElement = form.querySelector('[name="title"]');
const priceFieldElement = form.querySelector('[name="price"]');

//slider
const sliderElement = document.querySelector('.ad-form__slider');

//roomsFields
const roomsFieldElement = form.querySelector('[name="rooms"]');
const capacityFieldElement = form.querySelector('[name="capacity"]');

const typeFieldElement = form.querySelector('[name="type"]');

//timeFields
const timeFieldset = document.querySelector('.ad-form__element--time');
const timeIn = document.querySelector('[name="timein"]');
const timeOut = document.querySelector('[name="timeout"]');

const RoomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const limit = 100000;

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--error'
});

const initValidate = () => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault(); //Заглушку потом убрать.

    const valid = pristine.validate();

    if (valid) {
      console.log('Провалидировано');
    } else {
      throw new Error('Форма не валидна');
    }

  });
};


//---------Валидация Заголовка------------//

// Проверка поля заголовка объявления
const checkStringLength = (value) => {
  const text = value.split(' ');

  return text.every((item) => item.length <= 100);
};

//---------Валидация Гостей и Комнат------------//

// Проверка на количество гостей
const validCapacity = () => {

  if (RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value)) {
    return true;
  }
  return false;
};

// Формируем сообщение в зависимости от выбора комнат
const validCapacityMessage = () => {
  const value = roomsFieldElement.value;

  switch (value) {

    case '1':
      return `${value} комната для ${value} кота`;

    case '2':
      return `${value} ${value === '2' ? 'комнаты' : 'комнат'} для ${value} ${value === '2' ? 'котов' : 'кота'}`;

    case '3':
      return `${value} ${value === '3' ? 'комнаты' : 'комнат'} для ${value} ${value === '3' ? 'котов' : 'кота'}`;

    case '100':
      return `${value} комнат не для котов, а для птенцов.`;
  }
};

//Создаём и инициализируем слайдер!
const priceUiSlider = createUiSlider(sliderElement, priceFieldElement, () => {
  priceFieldElement.value = priceUiSlider.get();

  pristine.validate(priceFieldElement);
});

//---------Валидация Типа жилья------------//

//Задаём минимальную цену - если выбран данный ${target}
typeFieldElement.addEventListener('change', (evt) => {

  for (const key in TYPE_FLATS) {

    if (evt.target.value === key) {
      priceFieldElement.value = '';
      priceFieldElement.placeholder = `${TYPE_FLATS[key].price}`;

      //Обновляем значение слайдера по объекту
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: TYPE_FLATS[key].price,
          max: TYPE_FLATS[key].max ? TYPE_FLATS[key].max : 100000
        },
        step: TYPE_FLATS[key].step,
      });
      sliderElement.noUiSlider.set(TYPE_FLATS[key].price);
    }
  }
});

//Проверяем заданную ценну с текущей
const checkPricePlaceholder = () => {

  const placeholder = Number(priceFieldElement.placeholder);
  priceFieldElement.value = parseInt(priceFieldElement.value, 10 || 0);


  return priceFieldElement.value >= placeholder && priceFieldElement.value <= limit;
};

// Получаем сообщение ошибки цены
const getPriceMessage = () => {

  if (priceFieldElement.value >= limit) {
    return 'Максимальная цена 100 000';
  }

  return `Минимальная цена ${priceFieldElement.placeholder}`;
};

//---------Валидация Время заезда------------//

//Проверяем время заезда между собой
timeFieldset.addEventListener('change', (evt) => {

  if (evt.target.value !== timeIn.value) {
    timeIn.value = evt.target.value;
  }

  if (evt.target.value !== timeOut.value) {
    timeOut.value = evt.target.value;
  }
});


// Валидация заголовка
pristine.addValidator(titleFieldElement, checkStringLength, 'Максимальная длина 100 символов.');

// Валидация цены
pristine.addValidator(priceFieldElement, checkPricePlaceholder, getPriceMessage);

// Валидация гостей и комнат
pristine.addValidator(roomsFieldElement, validCapacity, validCapacityMessage);

capacityFieldElement.addEventListener('change', () => {
  pristine.validate(roomsFieldElement);
});


export { initValidate, priceUiSlider };
