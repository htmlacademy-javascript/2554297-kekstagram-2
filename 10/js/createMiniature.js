import { finalMas } from './mas.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const similarFinalMas = finalMas();

const fragment = document.createDocumentFragment();

similarFinalMas.forEach(({url, description, comments, likes}) => {
  const copy = template.cloneNode(true);

  copy.querySelector('.picture__img').src = url;
  copy.querySelector('.picture__img').alt = description;
  copy.querySelector('.picture__comments').textContent = comments.length;//
  copy.querySelector('.picture__likes').textContent = likes;//

  container.append(copy);
});

container.appendChild(fragment);
export{similarFinalMas};

/* <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template> */
/* <section class="pictures  container">
<h2 class="pictures__title  visually-hidden">Фотографии других пользователей</h2> */
