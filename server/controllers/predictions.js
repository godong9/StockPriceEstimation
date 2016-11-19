const log4js = require('log4js');
const logger = log4js.getLogger('controllers/predictions');
const Prediction = require('../models/predictions');

let PredictionController = {
  getPredictions: function getPredictions(req, res, next) {
    let params = {};
    logger.debug(params);
    res.render('prediction', {});
  }
};

module.exports = PredictionController;
