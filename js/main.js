import './full-picture.js';
import { finalMas } from './mas.js';
import {renderThumbs} from './create-miniature.js';
import { imageProcessor } from './full-picture.js';
const dataThumbs = finalMas();
renderThumbs(dataThumbs);

imageProcessor(dataThumbs);

