'use strict';

const { ERRORS, OPERATIONS } = require('../constants');

/**
 * Perform arithmetic operation
 * Receives two numeric values and performs an arithmetic operation specified in the header.
 *
 * body Calculate_body
 * operation String The arithmetic operation to perform
 * returns inline_response_200
 **/
exports.calculate = function (body, operation) {
  return new Promise((resolve, reject) => {
    const { firstNum, secondNum } = body;

    if (isNaN(firstNum) || isNaN(secondNum)) {
      return reject(new Error(ERRORS.MUST_BE_NUMBERS));
    }

    let result;

    try {
      switch (operation) {
        case OPERATIONS.ADD:
          result = firstNum + secondNum;
          break;
        case OPERATIONS.SUBTRACT:
          result = firstNum - secondNum;
          break;
        case OPERATIONS.MULTIPLY:
          result = firstNum * secondNum;
          break;
        case OPERATIONS.DIVIDE:
          if (secondNum === 0) {
            throw new Error(ERRORS.DIVISION_BY_ZERO);
          }
          result = firstNum / secondNum;
          break;
        case OPERATIONS.EXPONENT:
          result = Math.pow(firstNum, secondNum);
          break;
        default:
          throw new Error(ERRORS.INVALID_OPERATION);
      }
      resolve({ result });
    } catch (error) {
      reject(error);
    }
  });
};
