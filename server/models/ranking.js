'use strict';

const pool = require('../db/db').pool;

let Ranking = {
  getRankings: function (cb) {
    let query = 'SELECT ranking.*, user.nickname, user.grade_id FROM ranking INNER JOIN user ON ranking.user_id=user.id ORDER BY ranking.ranking;';
    let queryItem = [];
    pool.query(query, queryItem, function(err, rows) {
      cb(err, rows);
    });
  }
};

module.exports = Ranking;
