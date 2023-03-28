

const forms = ['ad-form', 'map__filters'].map((selector) => {
  const form = document.querySelector(`.${selector}`);
  //Возвращаем новый объект: каждой формы, все поля форм, и класс disabled формы
  return {
    form,
    parts: document.querySelectorAll('fieldset', 'select'),
    disabledClass: `${selector}--disabled`
  };
});

// Активирует и дезактивирует формы в зависимости от параметра true или false;
const toggleActivityForm = (activate) => {

  forms.forEach(({form, parts, disabledClass}) => {
    // Проверка на параметр
    form.classList[activate ? 'remove' : 'add'](disabledClass);

    parts.forEach((part) => {
      part.disabled = !activate;
    });

  });
};

export { toggleActivityForm };
