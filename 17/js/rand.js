const ALERT_SHOW_TIME = 5000;
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const showErrorAlert = (text) => {
  const message = document.createElement('div');
  message.classList.add('text__error');
  message.textContent = text;

  document.body.append(message);

  setTimeout(() => message.remove(), ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomInteger, isEscapeKey, isEnterKey, showErrorAlert};
