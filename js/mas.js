
const makeElement = (name, className, message) => {
  const element = document.createElement(name);
  element.classList.add(className);
  if (message) {
    element.textContent = message;
  }
  return element;
};

const commentsCreated = (mas, container) => {
  mas.forEach((element) => {
    const listElement = makeElement('li', 'social__comment');
    listElement.classList.add('hidden');
    const picture = makeElement('img', 'social__picture');
    picture.src = element.avatar;
    picture.alt = element.name;
    listElement.appendChild(picture);
    const commentText = makeElement('p', 'social__text', element.message);
    listElement.appendChild(commentText);
    container.appendChild(listElement);
  });
};

export {commentsCreated};

