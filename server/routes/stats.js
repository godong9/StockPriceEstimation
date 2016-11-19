const express = require('express');
const router = express.Router();
const StatController = require('../controllers/stats');

router.get('/', StatController.getStatPage);

module.exports = router;