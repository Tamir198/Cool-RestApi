const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../auth/auth.js');
const calculate = require('../service/calculate.js');
const utils = require('../utils/writer.js');
const controller = require('../controllers/calculate.js');

jest.mock('../auth/auth.js');
jest.mock('../service/calculate.js');
jest.mock('../utils/writer.js');

describe('calculatePOST', () => {
  let app;
  const token = 'some valid token';
  const baseHeaders = {
    Authorization: `Bearer ${token}`,
    operation: 'exponent',
  };

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.post('/api/calculate', (req, res, next) => {
      controller.calculatePOST(req, res, next, req.body, req.headers.operation);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const makeRequest = async (body) => {
    return await request(app)
      .post('/api/calculate')
      .set(baseHeaders)
      .send(body);
  };

  it('should respond with the calculation result', async () => {
    auth.mockResolvedValue();
    calculate.calculate.mockResolvedValue({ result: 3.1622776601683795 });
    utils.writeJson.mockImplementation((res, payload) => res.json(payload));

    const response = await makeRequest({ firstNum: 10, secondNum: 0.5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 3.1622776601683795 });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(calculate.calculate).toHaveBeenCalledWith(
      { firstNum: 10, secondNum: 0.5 },
      'exponent'
    );
    expect(utils.writeJson).toHaveBeenCalledWith(expect.anything(), {
      result: 3.1622776601683795,
    });
  });

  it('should handle authentication errors', async () => {
    auth.mockRejectedValue({ message: 'Unauthorized', status: 401 });
    utils.writeJson.mockImplementation((res, payload, status) =>
      res.status(status).json(payload)
    );

    const response = await makeRequest({ firstNum: 10, secondNum: 0.5 });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Unauthorized' });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(utils.writeJson).toHaveBeenCalledWith(
      expect.anything(),
      { message: 'Unauthorized' },
      401
    );
  });

  it('should handle calculation errors', async () => {
    auth.mockResolvedValue();
    calculate.calculate.mockRejectedValue(new Error('Calculation error'));
    utils.writeJson.mockImplementation((res, payload, status) =>
      res.status(status).json(payload)
    );

    const response = await makeRequest({ firstNum: 10, secondNum: 0.5 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Calculation error' });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(calculate.calculate).toHaveBeenCalledWith(
      { firstNum: 10, secondNum: 0.5 },
      'exponent'
    );
    expect(utils.writeJson).toHaveBeenCalledWith(
      expect.anything(),
      { message: 'Calculation error' },
      400
    );
  });
});
