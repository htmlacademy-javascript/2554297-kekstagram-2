import {isEscapeKey, isEnterKey} from './rand.js';
import {createSocialComment} from './mas.js';
const bigPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const photoCaption = bigPicture.querySelector('.social__caption');
const loadCommButton = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');

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
export function imageProcessor(dataThumbs) {
  container.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const actualDescription = dataThumbs.find((element) => element.id === parseInt(evt.target.closest('.picture').dataset.id, 10));
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

