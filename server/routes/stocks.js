'use strict';

const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stocks');

/**
 * 임시로 만들어 놓은 kospi, kosdaq 데이터 가져오는 API
 */
router.get('/kospi', StockController.getKospiStockList);

router.get('/kosdaq', StockController.getKosdaqStockList);

/**
 * @api {get} /stocks/random Get random stock
 * @apiVersion 1.0.0
 * @apiName GetRandomStock
 * @apiGroup Stoock
 *
 * @apiExample {url} Example usage:
 *    http://localhost:9000/stocks/random
 *
 * @apiSuccess {Object} data data
 */
router.get('/random', StockController.getRandomStock);

module.exports = router;
