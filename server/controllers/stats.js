const log4js = require('log4js');
const logger = log4js.getLogger('controllers/predictions');

let StatController = {
  getStatPage: function getStatPage(req, res) {
    res.render('stat', { activeTab: 'stat' })
  },
};

module.exports = StatController;
