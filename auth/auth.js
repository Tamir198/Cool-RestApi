const jwt = require('jsonwebtoken');
const { ERRORS } = require('../constants');

const { authorizeUser } = require('../dall/index');

const secretKey = process.env.SECRET_KEY;

function auth(req) {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return reject({ status: 401, message: ERRORS.NOT_AUTHORIZED });
    }

    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        const statusCode = err.TokenExpiredError ? 401 : 403;
        return reject({ status: statusCode, message: err });
      }

      authorizeUser(decodedToken)
        .then((user) => resolve(user))
        .catch((error) => reject(error));
    });
  });
}
module.exports = auth;
