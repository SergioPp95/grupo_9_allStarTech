const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/cart', usersController.cart)

module.exports = router;