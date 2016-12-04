'use strict';

const _ = require('underscore');
const async = require('async');
const logger = require('log4js').getLogger('controllers/stocks');
const Stock = require('../models/stocks');
const numeral = require('numeral');
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
  },
  getRandomStock: function getStockPrice(req, res) {
    async.waterfall([
      function(callback) {
        let randomId = Math.floor((Math.random() * 2466) + 1);
        if (req.query.stockId) {
          randomId = req.query.stockId;
        }
        Stock.getStockById(randomId, callback);
      },
      function(stockDbItem, callback) {
        logger.debug(stockDbItem);
        const params = {
          issueCode: stockDbItem.issue_code,
          market: stockDbItem.market
        };
        KoscomService.getStockPrice(params, function(err, priceResult) {
          let stockResult;
          logger.debug(priceResult);
          if (err) {
            return callback(err);
          }
          try {
            stockResult = _.extend(stockDbItem, {
              price: priceResult.result.trdPrc,
              price_text: numeral(priceResult.result.trdPrc).format('0,0') + '원'
            });
          } catch (e) {
            err = e;
          }
          callback(err, stockResult);
        });
      }
    ], function (err, result) {
      if (err) {
        logger.error(err);
        return res.status(500).send(INTERNAL_SERVER_ERROR);
      }
      res.send(result);
    });
  }
};

module.exports = StockController;
