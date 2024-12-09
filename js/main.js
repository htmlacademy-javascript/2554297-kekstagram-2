import './full-picture.js';
import {renderThumbs} from './create-miniature.js';
import { finalMas } from './mas.js';

const dataThumbs = finalMas();renderThumbs(dataThumbs);
export {dataThumbs};

