const processResponse = (url, method, body = null) => fetch(url, { method: method, body: body }).then((response) => response.json());

const getData = () => processResponse('https://31.javascript.htmlacademy.pro/kekstagram/data', 'GET');

const sendData = (body) => processResponse('https://31.javascript.htmlacademy.pro/kekstagram', 'POST', body);

export { getData, sendData };
