const { calculate } = require('../service/calculate');
const { ERRORS, OPERATIONS } = require('../constants');

const testOperation = async (body, operation, expectedResult) => {
  try {
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: expectedResult });
  } catch (error) {
    throw new Error(`Unexpected error: ${error.message}`);
  }
};

const testError = async (body, operation, expectedError) => {
  try {
    await calculate(body, operation);
    throw new Error('Expected calculate to throw an error, but it did not.');
  } catch (error) {
    expect(error.message).toEqual(expectedError);
  }
};

describe('Arithmetic Operations', () => {
  describe('Addition', () => {
    test('Adding positive numbers', async () => {
      await testOperation({ firstNum: 5, secondNum: 10 }, OPERATIONS.ADD, 15);
    });

    test('Add positive and negative number', async () => {
      await testOperation({ firstNum: 5, secondNum: -10 }, OPERATIONS.ADD, -5);
    });
  });

  describe('Subtraction', () => {
    test('Subtraction negative number', async () => {
      await testOperation(
        { firstNum: 10, secondNum: -50 },
        OPERATIONS.SUBTRACT,
        60
      );
    });

    test('Subtraction resulting in zero', async () => {
      await testOperation(
        { firstNum: 10, secondNum: 10 },
        OPERATIONS.SUBTRACT,
        0
      );
    });
  });

  describe('Multiplication', () => {
    test('Multiplication', async () => {
      await testOperation(
        { firstNum: -5, secondNum: -10 },
        OPERATIONS.MULTIPLY,
        50
      );
    });

    test('Multiplication by zero', async () => {
      await testOperation(
        { firstNum: 10, secondNum: 0 },
        OPERATIONS.MULTIPLY,
        0
      );
    });

    test('Multiplication by one', async () => {
      await testOperation(
        { firstNum: 10, secondNum: 1 },
        OPERATIONS.MULTIPLY,
        10
      );
    });
  });

  describe('Division', () => {
    test('Division', async () => {
      await testOperation({ firstNum: 10, secondNum: 5 }, OPERATIONS.DIVIDE, 2);
    });

    test('Division resulting in a fraction', async () => {
      await testOperation(
        { firstNum: 1, secondNum: 2 },
        OPERATIONS.DIVIDE,
        0.5
      );
    });

    test('Division by zero', async () => {
      await testError(
        { firstNum: 10, secondNum: 0 },
        OPERATIONS.DIVIDE,
        ERRORS.DIVISION_BY_ZERO
      );
    });
  });

  describe('Exponentiation', () => {
    test('Exponentiation', async () => {
      await testOperation(
        { firstNum: 2, secondNum: 3 },
        OPERATIONS.EXPONENT,
        8
      );
    });

    test('Exponentiation with zero exponent', async () => {
      await testOperation(
        { firstNum: 2, secondNum: 0 },
        OPERATIONS.EXPONENT,
        1
      );
    });

    test('Exponentiation with negative number', async () => {
      await testOperation(
        { firstNum: 4, secondNum: -2 },
        OPERATIONS.EXPONENT,
        0.0625
      );
    });

    test('Exponentiation with negative base and odd exponent', async () => {
      await testOperation(
        { firstNum: -2, secondNum: 3 },
        OPERATIONS.EXPONENT,
        -8
      );
    });

    test('Exponentiation with zero base', async () => {
      await testOperation(
        { firstNum: 0, secondNum: 3 },
        OPERATIONS.EXPONENT,
        0
      );
    });

    test('Exponentiation with large numbers', async () => {
      await testOperation(
        { firstNum: 10, secondNum: 10 },
        OPERATIONS.EXPONENT,
        10000000000
      );
    });
  });

  describe('Invalid Operations', () => {
    test('Invalid operation', async () => {
      await testError(
        { firstNum: 2, secondNum: 3 },
        'invalid',
        ERRORS.INVALID_OPERATION
      );
    });

    test('One argument as string', async () => {
      await testError(
        { firstNum: 2, secondNum: 'three' },
        OPERATIONS.ADD,
        ERRORS.MUST_BE_NUMBERS
      );
    });

    test('Both arguments as strings', async () => {
      await testError(
        { firstNum: 'two', secondNum: 'three' },
        OPERATIONS.ADD,
        ERRORS.MUST_BE_NUMBERS
      );
    });

    test('First argument as string', async () => {
      await testError(
        { firstNum: 'two', secondNum: 3 },
        OPERATIONS.ADD,
        ERRORS.MUST_BE_NUMBERS
      );
    });

    test('Both arguments missing', async () => {
      await testError({}, OPERATIONS.ADD, ERRORS.MUST_BE_NUMBERS);
    });

    test('One argument missing', async () => {
      await testError({ firstNum: 2 }, OPERATIONS.ADD, ERRORS.MUST_BE_NUMBERS);
    });
  });
});
