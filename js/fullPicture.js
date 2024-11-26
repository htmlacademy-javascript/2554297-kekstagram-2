import {isEscapeKey, isEnterKey} from './rand.js';
import {createUsers, createComment} from './mas.js';
import {description, messageCommentator, nameCommentator, count} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');

const photo = createUsers();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function openPictureModal() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}
const addContainerClickHandler = function (containers, photos) {
  containers.addEventListener('click', () => {
    openPictureModal();
    bigPictureImg.src = photos.url;
  });
};

for (let index = 0; index < count; index++) {
  addContainerClickHandler(container[index], photo[index].id);
}

container.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openPictureModal();
  }
});


function closePictureModal() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}
closePicture.addEventListener('click', () => {
  closePictureModal();
});
closePicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePictureModal();
  }
});

//       <!-- Комментарии к изображению -->
//       <div class="social__comment-count"><span class="social__comment-shown-count">5</span> из <span class="social__comment-total-count">125</span> комментариев</div>
//       <ul class="social__comments">
//         <li class="social__comment">
//           <img class="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//           <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
//         </li>
//         <li class="social__comment">
//           <img class="social__picture" src="img/avatar-3.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//            <p class="social__text">Да это фоташоп!!!!!!!!</p>
//         </li>
//       </ul>

// <!-- Полноэкранный показ изображения -->
// <section class="big-picture  overlay  hidden">
//   <h2 class="big-picture__title  visually-hidden">Просмотр фотографии</h2>
//   <div class="big-picture__preview">

//     <!-- Просмотр изображения -->
//     <div class="big-picture__img">
//       <img src="img/logo-background-3.jpg" alt="Девушка в купальнике" width="600" height="600">
//     </div>

//     <!-- Информация об изображении. Подпись, комментарии, количество лайков -->
//     <div class="big-picture__social  social">
//       <div class="social__header">
//         <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
//         <p class="social__caption">Тестим новую камеру! =)</p>
//         <p class="social__likes">Нравится <span class="likes-count">356</span></p>
//       </div>

//       <!-- Кнопка для загрузки новой порции комментариев -->
//       <button type="button" class="social__comments-loader  comments-loader">Загрузить еще</button>

//       <!-- Форма для отправки комментария -->
//       <div class="social__footer">
//         <img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
//         <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
//         <button type="button" class="social__footer-btn" name="button">Отправить</button>
//       </div>
//     </div>

//     <!-- Кнопка для выхода из полноэкранного просмотра изображения -->
//     <button type="reset" class="big-picture__cancel  cancel" id="picture-cancel">Закрыть</button>
//   </div>
// </section>
