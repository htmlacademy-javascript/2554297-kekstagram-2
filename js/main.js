import './full-picture.js';
import {renderThumbs} from './create-miniature.js';
import { imageProcessor } from './full-picture.js';
import {initUploadPictureModule} from './upload-pic.js';
import { getData } from './data.js';
import { showErrorAlert } from './rand.js';

const message = 'Не удалось загрузить данные! Попробуйте перезагрузить страницу.';

initUploadPictureModule();
getData()
  .then((serverData) => {
    const dataset = serverData;
    renderThumbs(dataset);
    imageProcessor(dataset);
  })
  .catch(() => showErrorAlert(message));
