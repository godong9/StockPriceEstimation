const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.post('/login', UserController.login);

/* GET users listing. */
router.get('/', UserController.getUsers);

/* GET user by id. */
router.get('/id/:id', UserController.getUser);

module.exports = router;
