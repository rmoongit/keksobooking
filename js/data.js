import {
  getRandomFloat,
  generateAvatar,
  getRandomArrayElement,
  getRandomInteger,
  shuffledArray,

} from './util.js';

import {
  TYPE_FLATS,

} from './mocks.js';

const LOCATION = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

const ROOMS = {
  min: 1,
  max: 5,
};

const GUESTS = {
  min: 1,
  max: 5,
};

const PRICES = {
  min: 1000,
  max: 5000,
};

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const OFFERS = [
  'Уютная',
  'Ретро стиль',
  'Новый лофт',
  'Евро стандарт',
  'Фаворит',
];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'Бронирование без предоплаты',
  'Можно с детьми',
  'Собственный паркинг с лаунж зоной',
  'Детский парк и комната для детей',
  'Завтрак и Обед включены',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomCheckIndex = () => getRandomInteger(0, CHECK_IN_OUT.length - 1);

// Создаёт Объект
const createObject = (id = 1) => {
  const {MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG} = LOCATION;
  const lat = getRandomFloat(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloat(MIN_LNG, MAX_LNG, 5);
  //Формируем массив случайных индексов
  const checks = [getRandomCheckIndex(), getRandomCheckIndex()];


  return {
    author: {
      avatar: generateAvatar(id),
    },

    offer: {
      title: getRandomArrayElement(OFFERS),
      address: `${lat}, ${lng}`,
      price: getRandomInteger(PRICES.min, PRICES.max),
      type: getRandomArrayElement(Object.keys(TYPE_FLATS)),
      rooms: getRandomInteger(ROOMS.min, ROOMS.max),
      guests: getRandomInteger(GUESTS.min, GUESTS.max),
      checkin: CHECK_IN_OUT[Math.min(...checks)],
      checkout: CHECK_IN_OUT[Math.max(...checks)],
      features: shuffledArray(FEATURES).slice(0, getRandomInteger(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: shuffledArray(PHOTOS).slice(0, getRandomInteger(0, PHOTOS.length)),
    },

    location: {
      lat,
      lng,
    }
  };
};

// Создаёт массив наших объектов
const createSimilarObjects = Array.from({length: 1}, (_, id) => createObject(++id));

export {createSimilarObjects};
