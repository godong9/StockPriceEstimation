const async = require('async');
const log4js = require('log4js');
const pool = require('../db/db').pool;

let Stock = {
  getStockById: function getStockById(id, cb) {
    let query = 'SELECT * FROM stock WHERE id=?';
    let queryItem = id;
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows[0]);
    });
  },
  insertStockList: function insertStockList(params, cb) {
    async.each(params.isuLists, function(stockItem, callback) {
      let query = 'INSERT INTO stock (date, market, srt_code, issue_code, kor_name, kor_abbr) VALUES (?,?,?,?,?,?);';
      let insertItem = [
        params.trdDd,
        params.market,
        stockItem.isuCd,
        stockItem.isuSrtCd,
        stockItem.isuKorNm,
        stockItem.isuKorAbbr
      ];
      pool.query(query, insertItem, function(err) {
        callback(err);
      });
    }, function(err) {
      if (err) {
        return cb(err);
      } else {
        cb();
      }
    });
  }
};

module.exports = Stock;
