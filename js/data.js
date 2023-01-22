import {getRandomFloat, generateAvatar, getRandomArrayElement, getRandomInteger, shuffledArray} from './util.js';

const LOCATION = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

const ROOMS = {
  MIN_ROOM: 1,
  MAX_ROOM: 5,
};

const GUESTS = {
  MIN_GUEST: 1,
  MAX_GUEST: 5,
};

const PRICES = {
  MIN: 1000,
  MAX: 5000,
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

const FLAT_TYPES = [
  'palace', 'flat', 'house', 'bungalow', 'hotel'
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

//Objects
const createObject = (id = 1) => {
  const {MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG} = LOCATION;
  const lat = getRandomFloat(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: generateAvatar(id),
    },

    offer: {
      title: getRandomArrayElement(OFFERS),
      address: `${lat}, ${lng}`,
      price: getRandomInteger(PRICES.MIN, PRICES.MAX),
      type: getRandomArrayElement(FLAT_TYPES),
      rooms: getRandomInteger(ROOMS.MIN_ROOM,ROOMS.MAX_ROOM),
      guests: getRandomInteger(GUESTS.MIN_GUEST, GUESTS.MAX_GUEST),
      checkin: getRandomArrayElement(CHECK_IN_OUT),
      checkout: getRandomArrayElement(CHECK_IN_OUT),
      features: shuffledArray(FEATURES).slice(0, getRandomInteger(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS),
    },

    location: {
      lat,
      lng,
    }
  };
};

const createSimilarObjects = Array.from({length: 10}, (_, id) => createObject(++id));

export {createSimilarObjects};
