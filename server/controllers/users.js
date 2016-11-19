const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('controllers/users');
const User = require('../models/users');
const LOGIN_ERROR = '로그인 실패!';

var Session = require('../services/session');

let UserController = {
  login: function login(req, res) {
    let params = {
      email: req.body.email,
      password: req.body.password
    };
    User.getUserByEmail(params.email, function(err, rows) {
      if (err || !rows || rows.length === 0) {
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
