import { showAlert } from './util.js';

//Получаем данные с сервера
const getData = (onSuccess) => {
  const getUrl = 'https://26.javascript.pages.academy/keksobooking/data';

  fetch(getUrl)
    .then((response) => response.json())

    .then((data) => {
      onSuccess(data);
    })

    .catch(() => {
      //Ловим ошибку и показываем блок ошибки
      showAlert('Server is not available (Сервер не доступен)');
    });
};

//Отправляем данные на сервер с методом 'POST'
const postData = (body, unblockButton, onSuccess, onError) => {
  const postUrl = 'https://26.javascript.pages.academy/keksobooking';

  fetch(postUrl, {
    method: 'POST',  body,  type: 'multipart/form-data',
  },
  )

    .then((response) => {
      //Проверка если ответ сервера "ок(200)"
      if(response.ok) {
        unblockButton();
        onSuccess();
      }

      else {
        onError();
      }
    })

    .catch(() => {
      onError();
    });
};


export { getData, postData };


