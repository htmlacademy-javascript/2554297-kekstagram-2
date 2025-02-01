const serverUrl = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = (onLoad, ruin) => {
  fetch(`${serverUrl}/data`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(onLoad)
    .catch(ruin);
};

const sendData = (body) => fetch(`${serverUrl}`, {
  method: 'POST',
  body: body,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

export {getData, sendData};
