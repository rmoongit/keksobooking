import { forms } from './forms.js';

const { form: filtersElement, parts } = forms[1];
const filterControls = [...parts];

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
    const checkedCheckboxes = Array.from(filtersElement.querySelectorAll('[type="checkbox"]:checked'));
    return checkedCheckboxes.every(({ value }) => features.some((feature) => feature === value));
  }
};

const filterOffers = ({ offer }) =>
  filterControls.every(({ value, index }) => value === DEFAULT_VALUE || filterRules[index](offer, value));

export { filterOffers };
