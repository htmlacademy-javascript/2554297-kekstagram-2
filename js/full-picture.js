import {isEscapeKey, isEnterKey} from './rand.js';
import {dataThumbs} from './main.js';
import {createSocialComment} from './mas.js';

const bigPicture = document.querySelector('.big-picture');
const closePicture = document.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const photoCaption = bigPicture.querySelector('.social__caption');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
    loadCommentsButton.classList.add('hidden');
  }
};

function openPictureModal() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

container.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const actualDescription = dataThumbs.find((element) => element.id === parseInt(evt.target.closest('.picture').dataset.id, 10));
    openPictureModal();
    bigPictureImg.src = actualDescription.url;
    likesCount.textContent = actualDescription.likes;
    socialCommentTotalCount.textContent = actualDescription.comments.length;
    photoCaption.textContent = actualDescription.description;
    document.body.classList.add('modal-open');
    createSocialComment(actualDescription.comments, commentsContainer);
  }
});

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

