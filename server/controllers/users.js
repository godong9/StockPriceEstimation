'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('controllers/users');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const Session = require('../services/session');
const Mailer = require('../services/mailer');

const saltRounds = 10;
const REGISTER_ERROR = '회원가입 실패!';
const LOGIN_ERROR = '로그인 실패!';

let UserController = {
  register: function register(req, res) {
    let params = {
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname
    };
    bcrypt.hash(params.password, saltRounds, function(err, hash) {
      if (err) {
        logger.debug(err);
        return res.status(500).send(REGISTER_ERROR);
      }
      params.password = hash;
        User.insertUser(params, function(err) {
          if (err) {
            logger.debug(err);
            return res.status(500).send(REGISTER_ERROR);
          }
          res.send({});
        });
    });
  },
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

      bcrypt.compare(params.password, rows[0].password, function(err, result) {
        if (err || !result) {
          return res.status(500).send(LOGIN_ERROR);
        }
        Session.setSession(req, rows[0]);
        logger.debug(params);
        res.send(Session.getSession(req));
      });
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
