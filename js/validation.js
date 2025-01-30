const maxHashtags = 5;
const hashtagRegex = /^#[a-zA-Z\dа-яё]{1,19}$/;
const maxCommentLength = 140;
const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const findDuplicates = (arr) => {
  const lowerArr = arr.map((item) => item.toLowerCase());
  return lowerArr.some((item, index) => lowerArr.indexOf(item) !== index);
};

const checkHashtagChars = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

const checkHashtagLength = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return hashtags.every((hashtag) => hashtag.length <= 20);
};

const checkHashtagDuplicates = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return !findDuplicates(hashtags);
};

const checkHashtagCount = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return hashtags.length <= maxHashtags;
};

const checkHashtagOnlyHash = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return !hashtags.some((hashtag) => hashtag === '#');
};


const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let hashtagErrors = false;

const checkHashtagStart = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const isValid = hashtags.every((hashtag) => hashtag.startsWith('#'));
  if (!isValid) {
    hashtagErrors = true;
  }
  return isValid;
};


const checkCommentLength = (value) => {
  const isValid = value.trim().length <= maxCommentLength;
  const errorMessage = document.querySelector('.text_error');

  if (!isValid) {
    if (!errorMessage) {
      const message = document.createElement('div');
      message.classList.add('text_error');
      message.textContent = 'Комментарий не может быть больше 140 символов.';
      commentInput.insertAdjacentElement('afterend', message);
    }
  } else {
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  return isValid;
};
pristineSetup.addValidator(hashtagInput, checkHashtagStart, 'Хэштег должен начинаться с символа # (решётка).');
pristineSetup.addValidator(hashtagInput, checkHashtagChars, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.');
pristineSetup.addValidator(hashtagInput, checkHashtagOnlyHash, 'Хэштег не может состоять только из одной решётки.');
pristineSetup.addValidator(hashtagInput, checkHashtagLength, 'Максимальная длина одного хэштега 20 символов, включая решётку.');
pristineSetup.addValidator(hashtagInput, checkHashtagDuplicates, 'Один и тот же хэштег не может быть использован дважды.');
pristineSetup.addValidator(hashtagInput, checkHashtagCount, 'Нельзя указать больше пяти хэштегов.');
pristineSetup.addValidator(commentInput, checkCommentLength, 1, false, 'comment-error');

hashtagInput.addEventListener('input', () => {
  pristineSetup.validate(hashtagInput);
});

commentInput.addEventListener('input', () => {
  pristineSetup.validate(hashtagInput);
});

const validateUploadPictureForm = () => {
  hashtagErrors = false;
  const hashtagIsValid = pristineSetup.validate();
  return hashtagIsValid && !hashtagErrors;
};

export {validateUploadPictureForm};
