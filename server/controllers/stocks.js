const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('controllers/stocks');
const Stock = require('../models/stocks');

const KoscomService = require('../services/koscom');
const INTERNAL_SERVER_ERROR = '서버 에러 발생!';

let StockController = {
  getKospiStockList: function getKospiStockList(req, res) {
    KoscomService.getKospiStockList(function(err, result) {
      if (err) {
        res.send(INTERNAL_SERVER_ERROR);
        return;
      }
      Stock.insertStockList(result, function(err) {
        if (err) {
          logger.error(err);
          return res.status(500).send(INTERNAL_SERVER_ERROR);
        }
        res.send(result);
      });
    });
  },
  getKosdaqStockList: function getKosdaqStockList(req, res) {
    KoscomService.getKosdaqStockList(function(err, result) {
      if (err) {
        res.send(INTERNAL_SERVER_ERROR);
        return;
      }
      Stock.insertStockList(result, function(err) {
        if (err) {
          logger.error(err);
          return res.status(500).send(INTERNAL_SERVER_ERROR);
        }
        res.send(result);
      });
    });
  }
};

module.exports = StockController;
