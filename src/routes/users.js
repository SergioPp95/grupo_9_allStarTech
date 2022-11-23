const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);
// metodo de iniciar sesion
router.get('/register', usersController.register);
// crear usuario
router.get('/cart', usersController.cart)

module.exports = router;