'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.calculatePOST = function calculatePOST (req, res, next, body, operation) {
  Default.calculatePOST(body, operation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
