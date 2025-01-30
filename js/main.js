import {initSortFiltersModule} from './filter.js';
import {initUploadPictureModule} from './upload-pic.js';
import {imageProcessor} from './full-picture.js';
import { getData } from './data.js';

getData((server) => {
  const data = server;
  initSortFiltersModule(data);
  initUploadPictureModule(data);
  imageProcessor(data);
});
