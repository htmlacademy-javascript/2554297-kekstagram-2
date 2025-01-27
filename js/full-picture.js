import {isEscapeKey, isEnterKey, showErrorAlert} from './rand.js';
import {createSocialComment} from './mas.js';
import { getData } from './data.js';
import { renderThumbs } from './create-miniature.js';
import {initUploadPictureModule} from './upload-pic.js';
const bigPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const photoCaption = bigPicture.querySelector('.social__caption');
const loadCommButton = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');

initUploadPictureModule();
let dataset = [];
getData().then((serverData) => {
  dataset = serverData;
  renderThumbs(dataset);
  initUploadPictureModule(dataset);
}).catch(() => showErrorAlert('Не удалось загрузить данные! Попробуйте перезагрузить страницу.'));

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    loadCommButton.classList.remove('hidden');
  }
};

function openPictureModal() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

const clearComments = () => {
  while (commentsContainer.firstChild) {
    commentsContainer.innerHTML = '';
  }
};

const loadComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  if (hiddenComments.length > 0) {
    for (let i = 0; i < Math.min(5, hiddenComments.length); i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    commentsCount.textContent = `${commentsContainer.children.length - commentsContainer.querySelectorAll('.hidden').length} из ${commentsContainer.children.length} комментариев`;
    if (hiddenComments.length <= 5) {
      loadCommButton.classList.add('hidden');
    }
  }
};


const container = document.querySelector('.pictures');
export function imageProcessor(data) {
  container.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      evt.preventDefault();
      const pictureId = pictureElement.dataset.id;
      bigPicture.dataset.pictureId = pictureId;
      const actualDescription = data.find((item) => String(item.id) === pictureId);
      if (actualDescription) {
        openPictureModal();
        bigPictureImg.src = actualDescription.url;
        likesCount.textContent = actualDescription.likes;
        socialCommentTotalCount.textContent = actualDescription.comments.length;
        photoCaption.textContent = actualDescription.description;
        document.body.classList.add('modal-open');
        clearComments();
        createSocialComment(actualDescription.comments, commentsContainer);
        loadComments();
      }
    }
  });
}

loadCommButton.addEventListener('click', () => {
  loadComments();
});

function closePictureModal() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closePicture.addEventListener('click', () => {
  closePictureModal();
  document.body.classList.remove('modal-open');
  loadCommButton.classList.remove('hidden');
});

closePicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePictureModal();
  }
  document.body.classList.remove('modal-open');
  loadCommButton.classList.remove('hidden');
});

