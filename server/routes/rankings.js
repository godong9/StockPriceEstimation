'use strict';

const express = require('express');
const router = express.Router();
const RankingController = require('../controllers/rankings');

/**
 * GET Ranking page.
 */
router.get('/', RankingController.getRankingPage);

module.exports = router;