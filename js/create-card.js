import { TYPE_FLATS } from './mocks.js';

const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const photoTemplateElement = cardTemplateElement.querySelector('.popup__photo');

// Наполняет элемент по заданному селектору и возвращает его
const getElementFiller = (template) => {
  const fillElement = (selector, data = '', createChildElement) => {
    const element = template.querySelector(selector);
    const content = data.toString();

    if (Array.isArray(data) && data.length) {
      if (typeof createChildElement === 'function') {
        element.innerHTML = '';
        data.forEach((item) => {
          element.append(createChildElement(item));
        });
      } else {
        element.textContent = data.join(', ');
      }
    } else if (content) {
      element.textContent = content;
    } else {
      element.classList.add('visually-hidden');
    }
  };

  return fillElement;
};

// Генерирует карточку с данными что входят в неё
const createCard = ({ author = {}, offer = {} }) => {
  const cardElement = cardTemplateElement.cloneNode(true);

  const fillElement = getElementFiller(cardElement);

  // Заголовок объявления
  fillElement('.popup__title', offer.title);
  // Адрес объявления
  fillElement('.popup__text--address', offer.address);
  // Цена жилья
  fillElement('.popup__text--price', offer.price);
  // Тип жилья
  fillElement('.popup__type', TYPE_FLATS[offer.type].name);
  // Количество комнат
  fillElement('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  // Время заезда и выезда
  fillElement('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  // Доступные удобства
  fillElement('.popup__features', offer.features, (feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);

    return featureElement;
  });

  // Описание объявления
  fillElement('.popup__description', offer.description);

  // Фотографии объявления
  fillElement('.popup__photos', offer.photos, (photo) => {
    const photoElement = photoTemplateElement.cloneNode();
    photoElement.src = photo;

    return photoElement;
  });

  // Аватар пользователя
  const avatarElement = cardElement.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarElement.src = author.avatar;
  } else {
    avatarElement.remove();
  }

  //возвращаем заполненую карточку
  return cardElement;
};

export { createCard };
