import './full-picture.js';
import { finalMas } from './mas.js';
import {renderThumbs} from './create-miniature.js';
import { imageProcessor } from './full-picture.js';
import {initUploadPictureModule} from './upload-pic.js';
const dataThumbs = finalMas();
initUploadPictureModule();
renderThumbs(dataThumbs);
imageProcessor(dataThumbs);

