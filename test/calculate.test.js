const { calculate } = require('../service/calculate');

describe('Arithmetic Operations', () => {
  test('addition', async () => {
    const body = { firstNum: 5, secondNum: 10 };
    const operation = 'add';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 15 });
  });

  test('subtraction negative number', async () => {
    const body = { firstNum: 10, secondNum: -50 };
    const operation = 'subtract';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 60 });
  });

  test('multiplication', async () => {
    const body = { firstNum: -5, secondNum: -10 };
    const operation = 'multiply';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 50 });
  });

  test('division', async () => {
    const body = { firstNum: 10, secondNum: 5 };
    const operation = 'divide';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 2 });
  });

  test('division by zero', async () => {
    const body = { firstNum: 10, secondNum: 0 };
    const operation = 'divide';
    await expect(calculate(body, operation)).rejects.toEqual({
      error: 'Division by zero is not allowed',
    });
  });

  test('exponentiation', async () => {
    const body = { firstNum: 2, secondNum: 3 };
    const operation = 'exponent';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 8 });
  });

  test('exponentiation with zero', async () => {
    const body = { firstNum: 2, secondNum: 0 };
    const operation = 'exponent';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 1 });
  });

  test('exponentiation with negative number', async () => {
    const body = { firstNum: 4, secondNum: -2 };
    const operation = 'exponent';
    const result = await calculate(body, operation);
    expect(result).toEqual({ result: 0.0625 });
  });

  test('invalid operation', async () => {
    const body = { firstNum: 2, secondNum: 3 };
    const operation = 'invalid';
    await expect(calculate(body, operation)).rejects.toEqual({
      error: 'Invalid or not supported operation',
    });
  });
});
