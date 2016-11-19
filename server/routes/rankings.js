const express = require('express');
const router = express.Router();
const RankingController = require('../controllers/rankings');

router.get('/', RankingController.getRankingPage);

module.exports = router;