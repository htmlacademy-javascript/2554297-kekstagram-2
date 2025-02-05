import {validateUploadPictureForm, cleaningForm} from './validation.js';
import {createSlider, setupSlider, destroySlider} from './effect.js';
import {showMessage, createSuccessMessage, createErrorMessage} from './message.js';
import {sendData} from './data.js';
import {isEscapeKey} from './until.js';

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const PERCENT_BASE = 100;
const DECIMAL_BASE = 10;

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const checkedEffectInput = document.querySelector('.effects__radio[checked]');

const pictureScaleInput = document.querySelector('.scale__control--value');
const pictureScaleDownButton = document.querySelector('.scale__control--smaller');
const pictureScaleUpButton = document.querySelector('.scale__control--bigger');

const isFormValid = validateUploadPictureForm();

const onUploadPictureFormSubmit = (evt) => {
  evt.preventDefault();

  if (isFormValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        showMessage(createSuccessMessage, 'success');
        closePictureUpload();
      })
      .catch(() => {
        showMessage(createErrorMessage, 'error');
      })
      .finally(() => unblockSubmitButton());
  } else {
    showMessage(createErrorMessage, 'error');
  }
};

const onScaleDownButtonClick = () => {
  if (parseInt(pictureScaleInput.value, DECIMAL_BASE) > MIN_SCALE) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, DECIMAL_BASE) - SCALE_STEP}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, DECIMAL_BASE) / PERCENT_BASE})`;
  }
};

const onScaleUpButtonClick = () => {
  if (parseInt(pictureScaleInput.value, DECIMAL_BASE) < MAX_SCALE) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, DECIMAL_BASE) + SCALE_STEP}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, DECIMAL_BASE) / PERCENT_BASE})`;
  }
};

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${evt.target.value}`);

    setupSlider(evt.target.value);
  }
};

const onCloseButtonClick = () => closePictureUpload();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const addListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.addEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.addEventListener('click', onScaleUpButtonClick);
  effectsList.addEventListener('change', onEffectInputClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  pictureUploadForm.removeEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.removeEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.removeEventListener('click', onScaleUpButtonClick);
  effectsList.removeEventListener('change', onEffectInputClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function defaultSetupPictureUpload() {
  pictureUploadForm.reset();
  pictureUploadPreview.style = null;
  pictureUploadPreview.className = 'effects__preview--none';
  pictureScaleInput.defaultValue = '100%';
}

function openPictureUpload() {
  addListeners();
  createSlider();
  setupSlider(checkedEffectInput.value);
  const uploadedImage = URL.createObjectURL(pictureUploadInput.files[0]);
  pictureUploadPreview.src = uploadedImage;
  updateEffectPreviews(uploadedImage);
  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}
function updateEffectPreviews(uploadedImage) {
  const effectPreviews = document.querySelectorAll('.effects__preview ');
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${uploadedImage})`;
    preview.style.backgroundSize = 'cover';
  });
}
function closePictureUpload() {
  removeListeners();
  destroySlider();
  defaultSetupPictureUpload();

  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
  cleaningForm();
}

export const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
  defaultSetupPictureUpload();
};


