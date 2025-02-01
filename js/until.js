const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const showErrorAlert = () => {
  const message = document.createElement('div');
  message.classList.add('text__error');
  message.textContent = 'Не удалось загрузить данные! Попробуйте перезагрузить страницу.';

  document.body.append(message);

  setTimeout(() => message.remove(), ALERT_SHOW_TIME);
};
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return function(data, id) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(data, id);
    }, timeoutDelay);
  };
};
export {isEscapeKey, isEnterKey, showErrorAlert, debounce};
