import { forms } from './forms.js';
import { renderMap } from './map.js';

const { formElement, partElements } = forms[1];
const filterControls = [...partElements];

const DEFAULT_VALUE = 'any';

const housePrice = {
  low: {
    from: 0,
    to: 10000
  },

  middle: {
    from: 10000,
    to: 50000
  },

  high: {
    from: 50000,
    to: Infinity
  }
};

const filterRules = {
  'housing-type': ({ type }, value) => value === type,
  'housing-price': ({ price }, value) => price >= housePrice[value].from && price < housePrice[value].to,
  'housing-rooms': ({ rooms }, value) => value === rooms.toString(),
  'housing-guests': ({ guests }, value) => value === guests.toString(),
  'housing-features': ({ features }) => {
    if (!features) {
      return false;
    }
    const checkedCheckboxes = Array.from(formElement.querySelectorAll('[type="checkbox"]:checked'));
    return checkedCheckboxes.every(({ value }) => features.some((feature) => feature === value));
  }
};

const filterData = ({ offer }) =>
  filterControls.every(({ value, id }) => value === DEFAULT_VALUE || filterRules[id](offer, value));

const filteredData = (data) => {
  const offerLength = data.length > 0;
  const newOffer = offerLength ? data.filter(filterData) : data;

  return newOffer;
};

formElement.addEventListener('change', filteredData);

export { filterData, formElement, filteredData };
