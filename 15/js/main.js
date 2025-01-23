import './full-picture.js';
import { finalMas } from './mas.js';
import {renderThumbs} from './create-miniature.js';
import { imageProcessor } from './full-picture.js';
import {initUploadPictureModule} from './upload-pic.js';
initUploadPictureModule();
const dataThumbs = finalMas();
renderThumbs(dataThumbs);
imageProcessor(dataThumbs);

