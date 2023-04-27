
const filtersElement = document.querySelector('.map__filters');
const filterControls = Array.from(filtersElement.children);

const housePrice = {

  low: {
    from: 0,
    to: 10000,
  },

  middle: {
    from: 10000,
    to: 50000,
  },


  high: {
    from: 50000,
    to: Infinity,
  },

};

const initFilter = (data) => {

  filterControls.forEach((select) => {
    select.addEventListener('change', (evt) => {
      const optionValue = evt.target.value;

      data.filter((item) => {
        const {type, price, rooms, guests} = item.offer;
        let passFilter = true;

        // проверяем каждое свойство объекта на соответствие фильтру
        if (optionValue !== 'any' && type !== optionValue) {
          passFilter = false;
        }

        // пример сравнения цен
        if (optionValue === 'low' && price >= housePrice.low.to) {
          passFilter = false;
        } else if (optionValue === 'middle' && (price < 10000 || price > 50000)) {
          passFilter = false;
        } else if (optionValue === 'high' && price <= 50000) {
          passFilter = false;
        }
        else {
          passFilter = true;
        }

        return passFilter; // вернем только объекты, прошедшие все фильтры
      });
    });
  });
};

export { initFilter };
