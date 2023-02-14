const express = require('express')
const router = express.Router();

const usersController = require('../controllers/usersController')

const upload = require("../middlewares/uploadUser")
const userLoginByCookie = require("../middlewares/userLoginByCookie")
const userRouteCheck = require("../middlewares/userRouteCheck")
const validationsRegister = require('../middlewares/userRegisterValidation');
const validationsLogin = require('../middlewares/userLoginValidation');

// ** Rutas **
router.get('/login', userRouteCheck.forGuests, userLoginByCookie, usersController.login);

router.post("/login", validationsLogin, usersController.checkLogin)

router.get('/register', userRouteCheck.forGuests, usersController.register);

router.post("/register", upload.single("imagenPerfil"), validationsRegister , usersController.addRegister)

router.get("/profile", userRouteCheck.forUsers, usersController.profile)

router.post('/profile', userRouteCheck.forUsers, usersController.logout)

router.get('/products', userRouteCheck.forUsers, usersController.listProducts)

router.get('/cart', userRouteCheck.forUsers, usersController.cart)

module.exports = router;