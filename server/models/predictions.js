const log4js = require('log4js');
const pool = require('../db/db').pool;

let Prediction = {
  insertPrediction: function getUsers(params, cb) {
    let query = 'INSERT INTO prediction (user_id, stock_id, will_up, today_price) VALUES (?,?,?,?);';
    let insertItem = [
      params.userId,
      params.stockId,
      params.willUp,
      params.todayPrice
    ];
    pool.query(query, insertItem, function(err) {
      cb(err);
    });
  }
};

module.exports = Prediction;
