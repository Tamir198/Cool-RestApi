const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { ERRORS, ROLLS } = require('../constants/constants');

const secretKey = process.env.SECRET_KEY;

function auth(req, res) {
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

      fs.readFile(
        path.join(__dirname, '../mock/users.json'),
        'utf8',
        (err, data) => {
          if (err) {
            return reject({
              status: 500,
              message: ERRORS.INTERVAL_SERVER_ERROR,
              err,
            });
          }

          const users = JSON.parse(data);
          const user = users.find(
            (user) =>
              user.name === decodedToken.name &&
              user.password === decodedToken.password
          );

          if (!user) {
            return reject({ status: 404, message: ERRORS.USER_NOT_FOUND });
          }

          if (user.role !== ROLLS.ADMIN) {
            return reject({
              status: 403,
              message: ERRORS.FORBIDDEN_NO_ADMIN_ACCESS,
            });
          }

          resolve(user);
        }
      );
    });
  });
}
module.exports = auth;
