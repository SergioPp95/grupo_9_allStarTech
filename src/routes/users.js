const express = require('express')
const router = express.Router();

const usersController = require('../controllers/usersController')

const upload = require("../middlewares/uploadUser")
const userLoginByCookie = require("../middlewares/userLoginByCookie")
const userRouteCheck = require("../middlewares/userRouteCheck")

// ** Rutas **
router.get('/login', userRouteCheck.forGuests, userLoginByCookie, usersController.login);

router.post("/login", usersController.checkLogin)

router.get('/register', userRouteCheck.forGuests, usersController.register);

router.post("/register", upload.single("imagenPerfil"), usersController.addRegister)

router.get("/profile", userRouteCheck.forUsers, usersController.profile)

router.get('/cart', userRouteCheck.forUsers, usersController.cart)

module.exports = router;