'use strict';

const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stocks');

router.get('/kospi', StockController.getKospiStockList);

router.get('/kosdaq', StockController.getKosdaqStockList);

/**
 * stockId: req.query.stockId (optional) 321: 삼성전자, 1516: 카카오
 */
router.get('/random', StockController.getRandomStock);

module.exports = router;
