const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('controllers/users');
const User = require('../models/users');
const LOGIN_ERROR = '로그인 실패!';

const Session = require('../services/session');
const Mailer = require('../services/mailer');

let UserController = {
  login: function login(req, res) {
    let params = {
      email: req.body.email,
      password: req.body.password
    };
    User.getUserByEmail(params.email, function(err, rows) {
      if (err || !rows || rows.length === 0) {
        logger.error(err);
        return res.status(500).send(LOGIN_ERROR);
      }
      if (rows[0].password !== params.password) {
        return res.status(500).send(LOGIN_ERROR);
      }
      Session.setSession(req, rows[0]);
      logger.debug(params);
      res.send(Session.getSession(req));
    });
  },
  myPage: function myPage(req, res) {
    res.render('my-page', { activeTab: 'myPage' });
  },
  sendConfirmEmail: function sendConfirmEmail(req, res) {
    Mailer.sendMail('godong9@gmail.com', '비밀번호 분실 관련', '비밀번호 초기화', function(err, info) {
      logger.debug(info);
      res.send({});
    });
  },
  getUsers: function getUser(req, res, next) {
    let params = {};
    logger.debug(params);
    User.getUsers(params, function(err, user) {
      res.send(user);
    });
  },
  getUser: function getUser(req, res, next) {
    let params = {
      id: req.params.id
    };
    logger.debug(params);
    User.getUser(params, function(err, user) {
      res.send(user);
    });
  }
};

module.exports = UserController;
