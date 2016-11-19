const log4js = require('log4js');
const logger = log4js.getLogger('controllers/predictions');
const Prediction = require('../models/predictions');

const INTERNAL_SERVER_ERROR = '서버 에러 발생!';

let PredictionController = {
  setPrediction: function setPrediction(req, res) {
    // TODO: 유저 id 세션에서 가져와야함!
    let params = {
      userId: 1,
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
