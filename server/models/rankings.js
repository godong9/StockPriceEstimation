const log4js = require('log4js');
const pool = require('../db/db').pool;

let Ranking = {
  getRankingsWithUserRanking: function (userId, cb) {
    let query = 'SELECT COUNT(*) AS stat_count, prediction.stock_id, stock.kor_name, prediction.today_price FROM prediction INNER JOIN stock ON prediction.stock_id=stock.id WHERE will_up=? GROUP BY prediction.stock_id ORDER BY stat_count DESC LIMIT 12;';
    let queryItem = willUp;
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows);
    });
  }
};

module.exports = Ranking;
