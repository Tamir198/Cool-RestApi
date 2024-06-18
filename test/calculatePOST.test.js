const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../auth/auth.js');
const calculate = require('../service/calculate.js');
const utils = require('../utils/writer.js');
const controller = require('../controllers/calculate.js');
const { OPERATIONS, ERRORS } = require('../constants/index.js');

jest.mock('../auth/auth.js');
jest.mock('../service/calculate.js');
jest.mock('../utils/writer.js');

describe('calculatePOST', () => {
  let app;
  const exampleBody = { firstNum: 10, secondNum: 0.5 };
  const token = 'some valid token';

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

  it('should respond with the calculation result', async () => {
    const result = 3.1622776601683795;
    auth.mockResolvedValue();
    calculate.calculate.mockResolvedValue({ result: result });
    utils.writeJson.mockImplementation((res, payload) => res.json(payload));

    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', `Bearer ${token}`)
      .set('operation', OPERATIONS.EXPONENT)
      .send(exampleBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: result });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(calculate.calculate).toHaveBeenCalledWith(
      exampleBody,
      OPERATIONS.EXPONENT
    );
    expect(utils.writeJson).toHaveBeenCalledWith(expect.anything(), {
      result: result,
    });
  });

  it('should handle authentication errors', async () => {
    auth.mockRejectedValue({ message: ERRORS.NOT_AUTHORIZED, status: 401 });
    utils.writeJson.mockImplementation((res, payload, status) =>
      res.status(status).json(payload)
    );

    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', `Bearer ${token}`)
      .set('operation', OPERATIONS.EXPONENT)
      .send(exampleBody);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: ERRORS.NOT_AUTHORIZED });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(utils.writeJson).toHaveBeenCalledWith(
      expect.anything(),
      { message: ERRORS.NOT_AUTHORIZED },
      401
    );
  });

  it('should handle calculation errors', async () => {
    auth.mockResolvedValue();
    calculate.calculate.mockRejectedValue(new Error(ERRORS.CALCULATION_ERROR));
    utils.writeJson.mockImplementation((res, payload, status) =>
      res.status(status).json(payload)
    );

    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', `Bearer ${token}`)
      .set('operation', OPERATIONS.EXPONENT)
      .send(exampleBody);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: ERRORS.CALCULATION_ERROR });
    expect(auth).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(calculate.calculate).toHaveBeenCalledWith(
      exampleBody,
      OPERATIONS.EXPONENT
    );
    expect(utils.writeJson).toHaveBeenCalledWith(
      expect.anything(),
      { message: ERRORS.CALCULATION_ERROR },
      400
    );
  });
});
