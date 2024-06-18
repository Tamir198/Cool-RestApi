'use strict';

var utils = require('../utils/writer.js');
var calculate = require('../service/calculate.js');
const auth = require('../auth/auth.js');

module.exports.calculatePOST = function calculatePOST(
  req,
  res,
  next,
  body,
  operation
) {
  auth(req, res)
    .then((user) => {
      calculate
        .calculate(body, operation)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    })
    .catch((error) => {
      utils.writeJson(res, { message: error.message }, error.status);
    });
};
