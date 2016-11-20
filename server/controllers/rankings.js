const log4js = require('log4js');
const logger = log4js.getLogger('controllers/rankings');
const Ranking = require('../models/rankings');
const _ = require('underscore');

var Session = require('../services/session');

const INTERNAL_SERVER_ERROR = '서버 에러 발생!';

let RankingController = {
  getRankingPage: function getRankingPage(req, res) {
    if (!Session.hasSession(req)) {
      return res.redirect('/');
    }
    const userId = Session.getSessionUserId(req);
    Ranking.getRankings(function(err, result) {
      if (err) {
        logger.error(err);
        return res.status(500).send(INTERNAL_SERVER_ERROR);
      }
      let finalResult = {
        activeTab: 'ranking',
        rankingList: result,
        userRanking: _.findWhere(result, {user_id: userId})
      };
      logger.debug(finalResult);
      res.render('ranking', finalResult);
    });
  }
};

module.exports = RankingController;
