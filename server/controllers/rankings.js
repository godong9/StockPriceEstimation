const log4js = require('log4js');
const logger = log4js.getLogger('controllers/rankings');
const Ranking = require('../models/rankings');
const _ = require('underscore');

var Session = require('../services/session');

const INTERNAL_SERVER_ERROR = '서버 에러 발생!';

let RankingController = {
  getRankingPage: function getRankingPage(req, res) {
    res.render('ranking', { activeTab: 'ranking' });
  }
};

module.exports = RankingController;
