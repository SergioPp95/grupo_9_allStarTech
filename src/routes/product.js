const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require("path");


// ** Multer **
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

// ** Rutas **
router.get('/', productController.index);

router.get('/create', productController.create); // Formulario de crear producto
router.post('/', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), productController.store); // Recibe datos de creacion

router.get('/:id', productController.detail); // Muestra detalles

router.get('/:id/edit', productController.edit) // Formulario de editar producto
router.put('/:id', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), productController.update) // Recibe datos de edicion

router.delete('/:id', productController.delete)

module.exports = router;