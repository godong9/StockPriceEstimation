const log4js = require('log4js');
const logger = log4js.getLogger('controllers/predictions');
const Prediction = require('../models/predictions');
const _ = require('underscore');

var Session = require('../services/session');

const INTERNAL_SERVER_ERROR = '서버 에러 발생!';

let PredictionController = {
  getPredictionPage: function getPredictionPage(req, res) {
    res.render('prediction', {})
  },
  getPredictionStatList: function getPredictionUpList(req, res) {
    Prediction.getPredictionsByWillUp(req.params.willUp, function(err, result) {
      if (err) {
        logger.error(err);
        return res.status(500).send(INTERNAL_SERVER_ERROR);
      }
      res.send(result);
    });
  },
  setPrediction: function setPrediction(req, res) {
    logger.debug("====== SESSION =====");
    logger.debug(req.session);
    if (!Session.hasSession(req)) {
      return res.status(500).send(INTERNAL_SERVER_ERROR);
    }
    const userId = Session.getSessionUserId(req);
    let params = {
      userId: userId,
      stockId: req.params.stockId,
      willUp: req.body.willUp,
      todayPrice: req.body.todayPrice
    };
    Prediction.insertPrediction(params, function(err) {
      if (err) {
        logger.error(err);
        return res.status(500).send(INTERNAL_SERVER_ERROR);
      }
      res.send({});
    });
  }
};

module.exports = PredictionController;
