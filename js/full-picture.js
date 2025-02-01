import {isEscapeKey, isEnterKey} from './until.js';
import {createSocialComment} from './mas.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const photoCaption = bigPicture.querySelector('.social__caption');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loadCommButton = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const closePicture = bigPicture.querySelector('.big-picture__cancel');
const CountComentVisible = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    loadCommButton.classList.remove('hidden');
  }
};

const clearComments = () => {
  commentsContainer.innerHTML = '';
};

const loadComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  if (hiddenComments.length > 0) {
    const hiddenCommentsArray = Array.from(hiddenComments);
    const commentToShow = hiddenCommentsArray.slice(0, CountComentVisible);

    commentToShow.forEach((comment) => {
      comment.classList.remove('hidden');
    });

    commentsCount.textContent = `${commentsContainer.children.length - commentsContainer.querySelectorAll('.hidden').length} из ${commentsContainer.children.length} комментариев`;
    if (hiddenComments.length <= CountComentVisible) {
      loadCommButton.classList.add('hidden');
    }
  }
};


const container = document.querySelector('.pictures');
function handlePictureClick(evt, data) {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    evt.preventDefault();
    const pictureId = pictureElement.dataset.id;
    bigPicture.dataset.pictureId = pictureId;
    const actualDescription = data.find((item) => String(item.id) === pictureId);
    if (actualDescription) {
      openPictureModal(actualDescription);
    }
  }
}

function openPictureModal(actualDescription) {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureImg.src = actualDescription.url;
  likesCount.textContent = actualDescription.likes;
  socialCommentTotalCount.textContent = actualDescription.comments.length;
  photoCaption.textContent = actualDescription.description;
  document.body.classList.add('modal-open');
  clearComments();
  createSocialComment(actualDescription.comments, commentsContainer);
  loadComments();
}

function closePictureModal() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

loadCommButton.addEventListener('click', () => {
  loadComments();
});


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

export function imageProcessor(data) {
  container.addEventListener('click', (evt) => handlePictureClick(evt, data));
}


