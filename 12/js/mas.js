import {getRandomArrayElement, getRandomInteger} from './rand.js';
import {description, messageCommentator, nameCommentator, count} from './data.js';

const createComment = (indexx) => ({
  id: indexx + 1,
  avatar: `img/avatar-${ getRandomInteger(1, 6) } .svg`,
  message: `${getRandomArrayElement(messageCommentator)}`,
  name: `${getRandomArrayElement(nameCommentator)}`,
});

const createUsers = (index) => ({
  id: index + 1,
  url: `photos/${ index + 1 }.jpg` ,
  description: `${getRandomArrayElement(description)}`,
  likes: getRandomInteger(1, 200),
  comments: Array.from({ length: getRandomInteger(1, 30) }, (__, indexx) => createComment(indexx)),
});
const finalMas = () => Array.from({length:count}, (__, index) => createUsers(index));

const makeElement = (name, className, message) => {
  const element = document.createElement(name);
  element.classList.add(className);
  if (message) {
    element.textContent = message;
  }
  return element;
};

const createSocialComment = (mas, container) => {
  mas.forEach((element) => {
    const listElement = makeElement('li', 'social__comment');
    const picture = makeElement('img', 'social__picture');
    picture.src = element.avatar;
    picture.alt = element.name;
    listElement.appendChild(picture);
    const commentText = makeElement('p', 'social__text', element.message);
    listElement.appendChild(commentText);
    container.appendChild(listElement);
  });
};

export {finalMas, createUsers, createComment, createSocialComment};

