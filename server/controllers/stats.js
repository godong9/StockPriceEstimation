'use strict';

const logger = require('log4js').getLogger('controllers/predictions');

let StatController = {
  getStatPage: function getStatPage(req, res) {
    res.render('stat', { activeTab: 'stat' });
  },
  getStatDetailPage: function getStatDetailPage(req, res) {
    res.render('stat-detail', { activeTab: 'stat' });
  }
};

module.exports = StatController;
