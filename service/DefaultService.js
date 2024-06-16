'use strict';


/**
 * Perform arithmetic operation
 * Receives two numeric values and performs an arithmetic operation specified in the header.
 *
 * body Calculate_body
 * operation String The arithmetic operation to perform
 * returns inline_response_200
 **/
exports.calculatePOST = function(body,operation) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
    "result" : 0.8008281904610115
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

