const forms = ['.ad-form', '.map__filters'].map((selector) => {
  const formElement = document.querySelector(`${selector}`);
  //Возвращаем новый объект: каждой формы, все поля форм, и класс disabled формы
  return {
    formElement,
    partElements: formElement.querySelectorAll('fieldset, select'),
    disabledClass: `${selector}--disabled`
  };
});

// Активирует и дезактивирует формы в зависимости от параметра true или false;
const toggleActivityForm = (activate) => {
  forms.forEach(({ formElement, partElements, disabledClass }) => {
    // Проверка на параметр
    formElement.classList[activate ? 'remove' : 'add'](disabledClass);

    partElements.forEach((partElement) => {
      partElement.disabled = !activate;
    });
  });
};

export { toggleActivityForm, forms };
