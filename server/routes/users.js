const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

/* GET users listing. */
router.get('/', UserController.getUsers);

/* GET user by id. */
router.get('/:id', UserController.getUser);

module.exports = router;
