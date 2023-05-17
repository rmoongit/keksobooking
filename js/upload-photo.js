const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const initImageControl = (choserFileElement, previewFileElement) => {
  const imageElement = previewFileElement.querySelector('img');

  const clearImageControl = () => {
    choserFileElement.value = '';
    previewFileElement.style.backgroundImage = 'none';

    if (imageElement) {
      imageElement.style.visibility = 'visible';
      imageElement.style.backgroundImage = 'none';
    }
  };

  previewFileElement.style.backgroundSize = 'cover';
  previewFileElement.style.backgroundRepeat = 'no-repeat';

  choserFileElement.addEventListener('change', () => {
    const file = choserFileElement.files[0];
    const fileName = file.name.toLowerCase();
    const checkFiles = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (!checkFiles) {
      return clearImageControl();
    }

    if (imageElement) {
      imageElement.style.visibility = 'hidden';
    }

    previewFileElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  return clearImageControl;
};

export { initImageControl };
