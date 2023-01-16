const MIN_ROOMS = 1,
  MAX_ROOMS = 5;

const MIN_GUEST = 1,
  MAX_GUEST = 5;

const LOCATION = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
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


// function genereate random integer from min to max
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

//function generate random integer with float decimals
const getRandomFloat = (min, max, decimals = 1) => {
  const result = (Math.random() * (max - min) + min);

  return +result.toFixed(decimals);
};

// function generate random index array element
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// function for lead zero
const getNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;

// function generate string
const generateAvatar = (num) => {
  const string = `img/avatars/user/${getNumberWithLeadZero(num)}.png`;

  return string;
};

// functions gets random location
const getRandomLat = () => getRandomFloat(LOCATION.MIN_LAT, LOCATION.MAX_LAT, 5);

const getRandomLng = () => getRandomFloat(LOCATION.MIN_LNG, LOCATION.MAX_LNG, 5);

//Objects

const createObject = (id = 1) => ({

  author: {
    avatar: generateAvatar(id),
  },

  offer: {
    title: getRandomArrayElement(OFFERS),
    address: `${getRandomLat()}, ${getRandomLng()}`,
    price: getRandomInteger(PRICES.MIN, PRICES.MAX),
    type: getRandomArrayElement(FLAT_TYPES),
    rooms: getRandomInteger(MIN_ROOMS,MAX_ROOMS),
    guests: getRandomInteger(MIN_GUEST,MAX_GUEST),
    checkin: getRandomArrayElement(CHECK_IN_OUT),
    checkout: getRandomArrayElement(CHECK_IN_OUT),
    features: FEATURES.slice(0, getRandomInteger(0, FEATURES.length)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  },

  location: {
    lat: getRandomLat(),
    lng: getRandomLng(),
  }
});

const generateSimilarObjects = Array.from({length: 10}, (_, id) => createObject(++id));

console.log(generateSimilarObjects);

