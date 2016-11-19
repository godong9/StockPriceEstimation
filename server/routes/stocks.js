const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stocks');

router.get('/kospi', StockController.getKospiStockList);

router.get('/kosdaq', StockController.getKosdaqStockList);

/**
 * issueCode: req.query.issueCode (주식 issue_code)
 * market: req.query.market (kospi or kosdaq)
 */
router.get('/price', StockController.getStockPrice);

router.get('/random', StockController.getRandomStock);

module.exports = router;
