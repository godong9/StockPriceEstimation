'use strict';

const express = require('express');
const router = express.Router();

/**
 * GET Main page.
 */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
