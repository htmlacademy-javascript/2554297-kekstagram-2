import {validateUploadPictureForm} from './validation.js';

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const effectsList = document.querySelector('.effects__list');

const onUploadPictureFormSubmit = (evt) => {
  if (!validateUploadPictureForm()) {
    evt.preventDefault();
  }
};

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  }
};

const onCloseButtonClick = () => closePictureUpload();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const addListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  effectsList.addEventListener('change', onEffectInputClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  pictureUploadForm.removeEventListener('submit', onUploadPictureFormSubmit);
  effectsList.removeEventListener('change', onEffectInputClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const defaultSetupPictureUpload = () => {
  pictureUploadForm.reset();
  pictureUploadPreview.style = null;
  pictureUploadPreview.className = 'effects__preview--none';
};

function openPictureUpload () {
  addListeners();

  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload () {
  removeListeners();
  defaultSetupPictureUpload();

  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
};

export {initUploadPictureModule};
