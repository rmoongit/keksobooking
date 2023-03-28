
// Функция генерирует случайное число от минимума(включая) до максимума
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// Функция генерирует случайные числа с плавающей точкой
function getRandomFloat(min, max, decimals = 1) {
  const result = (Math.random() * (max - min) + min);

  return +result.toFixed(decimals);
}

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

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getNumberWithLeadZero,
  generateAvatar,
  shuffledArray,
};
