

// Активирует и дезактивирует формы в зависимости от параметра true или false;
const toggleActivityForm = (activate) => {

  const formParentElements = document.querySelectorAll('.ad-form, .map__filters');
  const formElements = document.querySelectorAll('fieldset, select');
  // Проверка на параметр
  if (!activate) {
    formParentElements.forEach((parent) => {
      const classNameElement = parent.className;
      parent.classList.add(`${classNameElement  }--disabled`);
    });

    formElements.forEach((element) => {
      element.disabled = !activate;
    });
  }
};

toggleActivityForm(false);
