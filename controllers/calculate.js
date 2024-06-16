'use strict';

var utils = require('../utils/writer.js');
var calculate = require('../service/calculate.js');

module.exports.calculatePOST = function calculatePOST(
  req,
  res,
  next,
  body,
  operation
) {
  calculate
    .calculate(body, operation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
