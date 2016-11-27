'use strict';

const express = require('express');
const router = express.Router();
const StatController = require('../controllers/stats');

/**
 * GET Stat page.
 */
router.get('/', StatController.getStatPage);

/**
 * GET Stat detail page.
 */
router.get('/detail', StatController.getStatDetailPage);

module.exports = router;