import {isEscapeKey, isEnterKey} from './rand.js';
import {dataThumb} from './create-miniature.js';
import {createSocialComment} from './mas.js';

const bigPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
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
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
};

const loadComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  const totalComments = commentsContainer.children.length;
  let commentsToShow;

  if (totalComments <= 5) {
    commentsToShow = totalComments;
    loadCommButton.classList.add('hidden');
  } else {
    commentsToShow = 5;
    loadCommButton.classList.remove('hidden');
  }

  for (let i = 0; i < commentsToShow; i++) {
    hiddenComments[i].classList.remove('hidden');
  }

  const visibleComments = totalComments - commentsContainer.querySelectorAll('.hidden').length;
  commentsCount.textContent = `${visibleComments} из ${totalComments} комментариев`;
};


container.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const actualDescription = dataThumb.find((element) => element.id === parseInt(evt.target.closest('.picture').dataset.id, 10));
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

