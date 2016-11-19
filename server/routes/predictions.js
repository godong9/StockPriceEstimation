const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/predictions');

router.get('/', PredictionController.getPredictionPage);

/**
 * willUp: req.body.willUp (1: 상승, 0: 하락)
 * todayPrice: req.body.todayPrice (현재 가격)
 * userId: 현재 유저 id
 */
router.post('/:stockId', PredictionController.setPrediction);

module.exports = router;