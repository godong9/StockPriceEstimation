const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/predictions');

/* GET predictions listing. */
router.get('/', PredictionController.getPredictions);

module.exports = router;