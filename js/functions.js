//Функция для проверки длины строки.
function checkingTheLength (string, length) {
  if(string.length <= 0 || string.length === length){
    return true;
  } else{
    return false;
  }
}


checkingTheLength('', 6); // <= 0
checkingTheLength('123456', 6); // === length
checkingTheLength('1234567', 6); // > length


//Функция для проверки, является ли строка палиндромом.
function CheckingThePalindrome (string) {
  string = string.replaceAll(' ', '');//пробелы
  string = string.toLowerCase();//регистр
  let elements = '';
  const lineLength = string.length;//длина слова/предложения без пробелов

  for (let j = lineLength - 1 ; j >= 0; j--) {
    elements += string[j];//reverse
  }

  if(string === elements){ //проверка: если значения переменных совпадают 1
    return('слово/предложение является палидромом');
  }
  return('слово/предложение не является палидромом');
}
CheckingThePalindrome ('Лёша на полке клопа нашёл');
CheckingThePalindrome ('КОт');


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
extractValues(6); //6
extractValues(6.6); //66
