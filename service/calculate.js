'use strict';

/**
 * Perform arithmetic operation
 * Receives two numeric values and performs an arithmetic operation specified in the header.
 *
 * body Calculate_body
 * operation String The arithmetic operation to perform
 * returns inline_response_200
 **/
exports.calculate = function (body, operation) {
  return new Promise(function (resolve, reject) {
    const { firstNum, secondNum } = body;
    let result;

    switch (operation) {
      case 'add':
        result = firstNum + secondNum;
        break;
      case 'substract':
        result = firstNum - secondNum;
        break;
      case 'multiply':
        result = firstNum * secondNum;
        break;
      case 'divide':
        if (secondNum === 0) {
          reject({ error: 'Division by zero is not allowed' });
          return;
        }
        result = firstNum / secondNum;
        break;
      case 'exponent':
        result = Math.pow(firstNum, secondNum);
        break;
      default:
        reject({ error: 'Invalid or not supported operation' });
        return;
    }

    resolve({ result });
  });
};
