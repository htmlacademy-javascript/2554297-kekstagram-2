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

export {finalMas, createUsers, createComment};
