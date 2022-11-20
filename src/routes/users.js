const express = require('express')
const router = express.Router();

const usersController = require('../controllers/usersController')

const upload = require("../middlewares/uploadUser")
const userLoginByCookie = require("../middlewares/userLoginByCookie")

// ** Rutas **
router.get('/login', userLoginByCookie, usersController.login);

router.post("/login", usersController.checkLogin)

router.get('/register', usersController.register);

router.post("/register", upload.single("imagenPerfil"), usersController.addRegister)

router.get("/profile", usersController.profile)

router.get('/cart', usersController.cart)

module.exports = router;