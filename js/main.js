import './full-picture.js';
import {renderThumbs} from './create-miniature.js';
import { imageProcessor } from './full-picture.js';
import {initUploadPictureModule} from './upload-pic.js';
import { getData } from './data.js';
import { showErrorAlert } from './rand.js';
initUploadPictureModule();
getData()
  .then((serverData) => {
    const dataset = serverData;
    renderThumbs(dataset);
    imageProcessor(dataset);
  })
  .catch(() => showErrorAlert('Не удалось загрузить данные! Попробуйте перезагрузить страницу.'));


