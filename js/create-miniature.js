import { finalMas } from './mas.js';
const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();
const renderThumbs = (dataThumbs) => {
  dataThumbs.forEach(({id, url, description, comments, likes}) => {
    const copy = template.cloneNode(true);
    copy.querySelector('.picture__img').src = url;
    copy.querySelector('.picture__img').alt = description;
    copy.querySelector('.picture__comments').textContent = comments.length;
    copy.querySelector('.picture__likes').textContent = likes;
    copy.dataset.id = id;
    container.append(copy);
  });
};

container.appendChild(fragment);

const dataThumb = finalMas();
renderThumbs(dataThumb);
export {dataThumb};
