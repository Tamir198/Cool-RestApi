const fs = require('fs');
const path = require('path');
const { ERRORS, ROLLS } = require('../constants');

function authorizeUser(decodedToken) {
  return new Promise((resolve, reject) => {
    //This mimics a connection to non local db,
    //We use this because for the task I used local json file
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
}

module.exports = authorizeUser;
