'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

/* GET Join page. */
router.get('/join', function(req, res, next) {
  res.render('join');
});


router.post('/login', UserController.login);

router.get('/myPage', UserController.myPage);

router.get('/send/email', UserController.sendConfirmEmail);

/* GET users listing. */
router.get('/', UserController.getUsers);

/* GET user by id. */
router.get('/id/:id', UserController.getUser);

module.exports = router;
