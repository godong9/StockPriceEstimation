const log4js = require('log4js');
const pool = require('../db/db').pool;

let Prediction = {
  getPredictions: function getUsers(params, cb) {
    cb(null, {});
  }
};

module.exports = Prediction;
