const express = require('express')
const router = express.Router();
const validations = require('../middlewares/createEditProductValidation')

const productController = require('../controllers/productController');

const upload = require("../middlewares/uploadProduct")
const { forUsers } = require('../middlewares/userRouteCheck')
const updateProductCheck = require('../middlewares/updateProductCheckUser')

// ** Rutas **
router.get('/', productController.index);

router.get('/create', forUsers, productController.create); // Formulario de crear producto

router.post('/', forUsers, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), validations, productController.store); // Recibe datos de creacion

router.post('/search', productController.search);

router.get('/:id', productController.detail); // Muestra detalles

router.get('/:id/edit', forUsers, updateProductCheck, productController.edit) // Formulario de editar producto

router.put('/:id', forUsers, updateProductCheck, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), validations, productController.update) // Recibe datos de edicion

router.delete('/:id', forUsers, productController.delete)

module.exports = router;