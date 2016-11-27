'use strict';

const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/predictions');

/**
 * GET Prediction page.
 */
router.get('/', PredictionController.getPredictionPage);

/**
 * @api {get} /predictions/stat/list/:willUp Get stat list by willUp
 * @apiVersion 1.0.0
 * @apiName GetStatList
 * @apiGroup Stat
 *
 * @apiExample {url} Example usage:
 *    http://localhost:9000/predictions/stat/list/1
 *
 * @apiParam {String} willUp 상승 여부 (1: 상승, 0: 하락)
 *
 * @apiSuccess {Object[]} data data
 */
router.get('/stat/list/:willUp', PredictionController.getPredictionStatList);

/**
 * @api {post} /predictions/vote Post stock prediction
 * @apiVersion 1.0.0
 * @apiName PostStockPrediction
 * @apiGroup Stat
 *
 * @apiExample {url} Example usage:
 *    http://localhost:9000/predictions/vote
 *
 * @apiParam {Number} stockId 종목 ID
 * @apiParam {Number} willUp 상승 여부 (1: 상승, 0: 하락)
 * @apiParam {String} todayPrice 현재 가격
 *
 * @apiSuccess {Object} data data
 */
router.post('/vote', PredictionController.setPrediction);

module.exports = router;