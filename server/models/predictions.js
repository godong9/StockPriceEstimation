'use strict';

const pool = require('../db/db').pool;

let Prediction = {
  getPredictionsByWillUp: function (willUp, cb) {
    let query = 'SELECT COUNT(*) AS stat_count, prediction.stock_id, stock.kor_name, prediction.today_price FROM prediction INNER JOIN stock ON prediction.stock_id=stock.id WHERE will_up=? GROUP BY prediction.stock_id ORDER BY stat_count DESC LIMIT 12;';
    let queryItem = willUp;
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows);
    });
  },
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
