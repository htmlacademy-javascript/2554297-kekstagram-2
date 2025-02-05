import {renderThumbs} from './create-miniature.js';
import {debounce} from './until.js';
const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const FilterType = {
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const sortDescThumbnails = (first, second) => second.comments.length - first.comments.length;

const rerenderThumbnails = (data, id) => {
  let dataCopy = [...data];

  if (id === FilterType.random) {
    for (let i = dataCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
    }
    dataCopy = dataCopy.slice(0, RANDOM_PHOTOS_COUNT);
  }

  if (id === FilterType.discussed) {
    dataCopy.sort(sortDescThumbnails);
  }

  renderThumbs(dataCopy);
};

const rerenderTimeout = debounce((data, id) => rerenderThumbnails(data, id), RERENDER_DELAY);

const onThumbnailsFilterClick = (evt, data) => {
  const clickedButton = evt.target.closest('.img-filters__button');
  if (clickedButton && !clickedButton.classList.contains('img-filters__button--active')) {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    clickedButton.classList.add('img-filters__button--active');
    rerenderTimeout(data, clickedButton.id);
  }
};

export const initSortFiltersModule = (data) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', (evt) => onThumbnailsFilterClick(evt, data));
  renderThumbs(data);
};
