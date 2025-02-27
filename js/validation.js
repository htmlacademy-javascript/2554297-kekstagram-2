const MAX_COUNT_HASHTAGS = 5;
const HASHTAGS_REGEX = /^#[a-zA-Z\dа-яё]{1,19}$/;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 20;
const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const findDuplicates = (arrays) => {
  const lowerArrays = arrays.map((item) => item.toLowerCase());
  return lowerArrays.some((item, index) => lowerArrays.indexOf(item) !== index);
};


const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let hashtagErrors = false;


const checkCommentLength = (value) => {
  const isValid = value.trim().length <= MAX_COMMENT_LENGTH;
  const errorMessages = document.querySelector('.text_error');

  if (!isValid) {
    if (!errorMessages) {
      const message = document.createElement('div');
      message.classList.add('text_error');
      message.textContent = 'Комментарий не может быть больше 140 символов.';
      commentInput.insertAdjacentElement('afterend', message);
    }
  } else {
    if (errorMessages) {
      errorMessages.remove();
    }
  }

  return isValid;
};
const errorMessage = {
  hashtagStartWithHash: 'Хэштег должен начинаться с символа # (решётка).',
  invalidChar: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  hashtagOnlyHash: 'Хэштег не может состоять только из одной решётки.',
  maxLengthHashtag: 'Максимальная длина одного хэштега 20 символов, включая решётку.',
  caseInsensitive: 'Хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.',
  hashtagSpaces: 'Хэштеги разделяются пробелами.',
  duplicate: 'Один и тот же хэштег не может быть использован дважды.',
  maxHashtagExceeded: 'Нельзя указать больше пяти хэштегов.'
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  const errorMessages = [];

  if (!hashtags.every((hashtag) => hashtag.startsWith('#'))) {
    errorMessages.push(errorMessage.hashtagStartWithHash);
  }

  if (!hashtags.every((hashtag) => HASHTAGS_REGEX.test(hashtag))) {
    errorMessages.push(errorMessage.invalidChar);
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    errorMessages.push(errorMessage.hashtagOnlyHash);
  }

  if (hashtags.every((hashtag) => hashtag.length >= MAX_HASHTAGS_LENGTH)) {
    errorMessages.push(errorMessage.maxLengthHashtag);
  }

  if (findDuplicates(hashtags)) {
    errorMessages.push(errorMessage.duplicate);
  }

  if (hashtags.length > MAX_COUNT_HASHTAGS) {
    errorMessages.push(errorMessage.maxHashtagExceeded);
  }

  if (errorMessages.length > 0) {
    return errorMessages[0];
  }

  return true;
};

pristineSetup.addValidator(hashtagInput, validateHashtags, (error) => error);
pristineSetup.addValidator(commentInput, checkCommentLength, 1, false, 'comment-error');


const updateHashtagError = () => {
  const errorMessages = document.querySelectorAll('.img-upload__field-wrapper--error');
  errorMessages.forEach((error) => error.remove());

  const validationError = validateHashtags(hashtagInput.value);
  if (validationError !== true) {
    const message = document.createElement('div');
    message.classList.add('img-upload__field-wrapper--error');
    message.textContent = validationError;
    hashtagInput.insertAdjacentElement('afterend', message);
  }
};


hashtagInput.addEventListener('input', () => {
  pristineSetup.validate(hashtagInput);
  updateHashtagError();
});

commentInput.addEventListener('input', () => {
  pristineSetup.validate(hashtagInput);
  updateHashtagError();
});

const validateUploadPictureForm = () => {
  hashtagErrors = false;
  const hashtagIsValid = pristineSetup.validate();
  return hashtagIsValid && !hashtagErrors;
};

const cleaningForm = () => {
  if (hashtagInput.nextElementSibling && hashtagInput.nextElementSibling.classList.contains('img-upload__field-wrapper--error')) {
    hashtagInput.nextElementSibling.remove();
    pristineSetup.reset();
  }
};

export {validateUploadPictureForm, cleaningForm};
