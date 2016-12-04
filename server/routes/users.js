'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const passport = require('passport');

/**
 * Facebook Login
 */
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login/error' }),
  UserController.facebookLoginCallback);




/**
 * GET Join page.
 */
router.get('/join', function(req, res, next) {
  res.render('join');
});


router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/myPage', UserController.myPage);

router.get('/send/email', UserController.sendConfirmEmail);

/* GET users listing. */
router.get('/', UserController.getUsers);

/* GET user by id. */
router.get('/id/:id', UserController.getUser);

module.exports = router;
