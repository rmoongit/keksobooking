import { createSimilarObjects } from './data.js';

const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const mapBlockElement = document.querySelector('.map__canvas');

const renameTypeOfFlat = (dataObject) => {
  switch (dataObject) {
    case 'flat':
      return 'Квартира';

    case 'bungalow':
      return 'Бунгало';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';

    case 'hotel':
      return 'Отель';
  }
};

// foo generate count of objects with different param
const generateData = (data) => {
  const fragmentElement = document.createDocumentFragment();

  data.forEach(({offer}) => {
    const templateClonedElement = cardTemplateElement.cloneNode(true);

    templateClonedElement.querySelector('.popup__title').textContent = `${offer.title}`;
    templateClonedElement.querySelector('.popup__text--address').textContent = `${offer.address}`;
    templateClonedElement.querySelector('.popup__text--price').textContent = `${offer.price}  ₽/ночь`;
    templateClonedElement.querySelector('.popup__type').textContent = renameTypeOfFlat(`${offer.type}`);
    templateClonedElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    templateClonedElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    templateClonedElement.querySelector('.popup__features').textContent = `${offer.features}`;
    templateClonedElement.querySelector('.popup__description').textContent = `${offer.description}`;
    templateClonedElement.querySelector('.popup__photos img').src = `${offer.photos}`; //Остановился тут
    templateClonedElement.querySelector('.popup__avatar');

    fragmentElement.append(templateClonedElement);
  });
  mapBlockElement.append(fragmentElement);
};

console.log(generateData(createSimilarObjects));

