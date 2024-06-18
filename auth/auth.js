const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const secretKey = 'your-secret-key';

function auth(req, res) {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return reject({ status: 401, message: 'Unauthorized' });
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
              message: 'Internal Server Error',
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
            return reject({ status: 404, message: 'User not found' });
          }

          if (user.role !== 'admin') {
            return reject({
              status: 403,
              message: 'Forbidden: Admin access required',
            });
          }

          resolve(user);
        }
      );
    });
  });
}
module.exports = auth;
