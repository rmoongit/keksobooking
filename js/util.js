
// function genereate random integer from min to max
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

//function generate random integer with float decimals
function getRandomFloat(min, max, decimals = 1) {
  const result = (Math.random() * (max - min) + min);

  return +result.toFixed(decimals);
}

// function generate random index array element
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// function for lead zero
const getNumberWithLeadZero = (num) => `${num < 10 ? '0' : ''}${num}`;


// function generate string
const generateAvatar = (num) => {
  const string = `img/avatars/user/${getNumberWithLeadZero(num)}.png`;

  return string;
};

// function shich is shuffled array
const shuffledArray = (array) => array.sort(() => Math.random() - 0.5);


export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getNumberWithLeadZero,
  generateAvatar,
  shuffledArray
};
