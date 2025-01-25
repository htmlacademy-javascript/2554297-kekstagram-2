const findDuplicates = (elements) => elements.filter((item, index) => elements.indexOf(item) !== index);

const HASHTAG = /#[\da-zа-яё0-9]{1,19}\s/gi;

const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const checkHashtags = () => {
  const hashtagString = hashtagInput.value.trim();

  if (!hashtagString) {
    return true;
  }

  if (`${hashtagString} `.replace(HASHTAG, '') || hashtagString.split(' ').length > 5 || findDuplicates(hashtagString.toLowerCase().split(' ')).length !== 0) {
    return false;
  }

  return true;
};

const checkCommentLength = () => {
  const comment = commentInput.value.trim();
  return comment.length <= 140;
};

const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristineSetup.addValidator(hashtagInput, checkHashtags, 'ХэшТеги заполнено неверно');
pristineSetup.addValidator(commentInput, checkCommentLength, 'Комментарий не может быть больше 140 символов');
const validateUploadPictureForm = () => pristineSetup.validate();

export {validateUploadPictureForm};
