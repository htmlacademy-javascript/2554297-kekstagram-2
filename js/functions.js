//Функция для проверки длины строки.
function checkingTheLength (string, length) {
  return string.length <= length;
}

checkingTheLength('проверяемая строка', 20); // true
checkingTheLength('проверяемая строка', 18); // true
checkingTheLength('проверяемая строка', 10); // false


//Функция для проверки, является ли строка палиндромом.
function CheckingThePalindrome (string) {
  const data = string.replaceAll(' ', '').toLowerCase();//пробелы регистр
  const newString = data.split('').reverse().join('');
  return data === newString;
}

CheckingThePalindrome('топот'); // true
CheckingThePalindrome('ДовОд'); // true
CheckingThePalindrome('Кекс'); // false
CheckingThePalindrome('Лёша на полке клопа нашёл '); // true


/*Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 и возвращает их в виде целого положительного числа.
 Если в строке нет ни одной цифры, функция должна вернуть NaN*/

function extractValues (string) {

  if (typeof string === 'number'){ //если поступило число, то преобразуем в string
    string = String(string);
  }

  string = string.replaceAll(' ', ''); //пробелы
  let elements = '';
  let num;

  for (let j = 0; j < string.length; j++) {

    if (!isNaN(parseInt(string[j], 10))) { //если, преобразованный в тип данных int, полученный элемент не NaN
      elements += string[j]; // то его записываем в переменную (тип данных переменной string)
      num = parseInt(elements, 10); //преобразуем в int
    }
  }

  if (typeof num !== 'number') {
    return NaN;
  }

  // eslint-disable-next-line no-console
  console.log(num);
}
extractValues('2023 год'); //2023
extractValues('ECMAScript 2022'); //2022
extractValues('1 кефир, 0.5 батона'); //105
extractValues('агент 007'); //7
extractValues('а я томат'); //NaN
extractValues(2023); // 2023
extractValues(-1); // 1
extractValues(1.5); // 15
