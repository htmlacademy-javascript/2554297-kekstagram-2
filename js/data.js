const serverUrl = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = (onLoad, onFail) => {
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
    .catch(onFail);
};

const sendData = (onLoad, onFail, body) => {
  fetch(`${serverUrl}`, {
    method: 'POST',
    body: body,
  })
    .then(onLoad)
    .catch(onFail);
};

export {getData, sendData};
