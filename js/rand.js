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
  message.style.zIndex = '100';
  message.style.position = 'absolute';
  message.style.left = '0';
  message.style.top = '0';
  message.style.right = '0';
  message.style.padding = '10px';
  message.style.fontSize = '20px';
  message.style.textAlign = 'center';
  message.style.backgroundColor = 'red';
  message.textContent = text;

  document.body.append(message);

  setTimeout(() => message.remove(), ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomInteger, isEscapeKey, isEnterKey, showErrorAlert};
