const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('controllers/users');
const request = require('request');

const KOSCOM_STOCK_LIST_URI = 'https://sandbox-apigw.koscom.co.kr/v2/market/stocks/{marketcode}/lists';
const KOSCOM_STOCK_PRICE_URI = 'https://sandbox-apigw.koscom.co.kr/v2/market/stocks/{marketcode}/{issuecode}/price';
const KOSPI_MARKET = 'kospi';
const KOSDAQ_MARKET = 'kosdaq';
const API_KEY = 'l7xx64cf42c2384944dca7decd0ebd6cbe77';

let KoscomService = {
  getKospiStockList: function getKospiStockList(cb) {
    const url = KOSCOM_STOCK_LIST_URI.replace(/{marketcode}/g, encodeURIComponent(KOSPI_MARKET));
    const queryParams = '?' +  encodeURIComponent('apikey') + '=' + encodeURIComponent(API_KEY);

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      let stockData;
      logger.debug(body);
      try {
        stockData = JSON.parse(body);
        stockData.market = KOSPI_MARKET;
      } catch (e) {
        error = e;
      }
      cb(error, stockData)
    });
  },
  getKosdaqStockList: function getKospiStockList(cb) {
    const url = KOSCOM_STOCK_LIST_URI.replace(/{marketcode}/g, encodeURIComponent(KOSDAQ_MARKET));
    const queryParams = '?' +  encodeURIComponent('apikey') + '=' + encodeURIComponent(API_KEY);

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      let stockData;
      logger.debug(body);
      try {
        stockData = JSON.parse(body);
        stockData.market = KOSDAQ_MARKET;
      } catch (e) {
        error = e;
      }
      cb(error, stockData)
    });
  },
  getStockPrice: function getStockPrice(params, cb) {
    const url = KOSCOM_STOCK_PRICE_URI.replace(/{marketcode}/g, encodeURIComponent(params.market))
      .replace(/{issuecode}/g, encodeURIComponent(params.issueCode));
    const queryParams = '?' +  encodeURIComponent('apikey') + '=' + encodeURIComponent(API_KEY);

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      let priceData;
      logger.debug(body);
      try {
        priceData = JSON.parse(body);
      } catch (e) {
        error = e;
      }
      cb(error, priceData)
    });
  }
};

module.exports = KoscomService;

