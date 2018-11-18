'use strict';
var eachLimit = require('async/eachLimit');
var helpers = require('./helpers');

module.exports.queueCoins = (event, context, callback) => {
  helpers.queueCoins()
  .then(data => {
    callback(null, data);
    _return(200, 'Success: saveCoinsQueue()', event, data);
  })
  .catch(error => {
    callback(error);
    _return(500, 'Error: saveCoinsQueue()', event, error);
  });
};

module.exports.dequeueCoinBatch = (event, context, callback) => {
  const {id} = JSON.parse(event.Records[0].body);
  helpers.saveCoin(id)
  .then(data => {
    callback(null, event);
    _return(200, 'Success: dequeueCoinBatch()', event, data);
  })
  .catch(error => {
    callback(error);
    _return(500, 'Error: dequeueCoinBatch()', event, error);
  });
};

module.exports.rollupCoins = (event, context, callback) => {
  helpers.rollupCoins().then(data => {
    callback(null, data);
    _return(200, 'Success: saveCoinRollup()', event, data);
  })
  .catch(error => {
    callback(error);
    _return(500, 'Error: saveCoinRollup()', event, error)
  });
};

const _return = (statusCode, message, event, data) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      input: event,
      data: data,
    }),
  };
};
