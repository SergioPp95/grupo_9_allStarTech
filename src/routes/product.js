const express = require('express')
const router = express.Router();
const validations = require('../middlewares/createEditProductValidation')

const productController = require('../controllers/productController');

const upload = require("../middlewares/uploadProduct")



// ** Rutas **
router.get('/', productController.index);

router.get('/create', productController.create); // Formulario de crear producto

router.post('/', /*validations,*/ upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), productController.store); // Recibe datos de creacion

router.get('/:id', productController.detail); // Muestra detalles

router.get('/:id/edit', productController.edit) // Formulario de editar producto

router.put('/:id', /*validations ,*/upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), productController.update) // Recibe datos de edicion

router.delete('/:id', productController.delete)

module.exports = router;