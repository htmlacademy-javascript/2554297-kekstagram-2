import {getRandomArrayElement, getRandomInteger} from './rand.js';

const description = ['пляж', 'лес', 'море', 'юг', 'оеан', 'лето', 'весна', 'котики', 'будни',
  'работа', 'лайфхаки', 'блог', 'прайс-лист', 'ночь', 'эстетика',
  'книги', 'еда', 'зоопарк', 'театр', 'прогулка', 'путешествие', 'парк', 'закат', 'музыка', 'хобби' ];
const messageCommentator = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const nameCommentator = [
  'Маша', 'Саша', 'Дима', 'Андрей', 'Алексей', 'Вика', 'Сережа', 'Эдик', 'Сеня', 'Даша', 'Лика',
  'Рома', 'Оля', 'Юля', 'Антон', 'Люда', 'Виктор', 'Лилия', 'Олег', 'Давид', 'Влад', 'Люба', 'Женя', 'Ксюша', 'Настя',
];

const count = 25;

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
const finalMas = Array.from({length:count}, (__, index) => createUsers(index));

export {finalMas};
