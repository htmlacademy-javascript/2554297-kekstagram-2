const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const renderThumbs = (dataThumb) => {
  const existingThumbnails = container.querySelectorAll('.picture');
  existingThumbnails.forEach((thumbnail) => thumbnail.remove());

  const fragment = document.createDocumentFragment();
  dataThumb.forEach(({ id, url, description, comments, likes }) => {
    const copy = template.cloneNode(true);
    copy.querySelector('.picture__img').src = url;
    copy.querySelector('.picture__img').alt = description;
    copy.querySelector('.picture__comments').textContent = comments.length;
    copy.querySelector('.picture__likes').textContent = likes;
    copy.dataset.id = String(id);
    fragment.appendChild(copy);
  });

  container.appendChild(fragment);
};


export { renderThumbs };
