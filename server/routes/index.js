const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stocks/kospi', StockController.getKospiStockList);

router.get('/stocks/kosdaq', StockController.getKosdaqStockList);

module.exports = router;
