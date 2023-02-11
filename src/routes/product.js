const express = require('express')
const router = express.Router();
const validations = require('../middlewares/createEditProductValidation')

const productController = require('../controllers/productController');

const upload = require("../middlewares/uploadProduct")



router.get('/', productController.index);

router.get('/create', productController.create); 

router.post('/', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), validations, productController.store); 

router.get('/:id', productController.detail); 

router.get('/:id/edit', productController.edit)

router.put('/:id', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }
]), validations, productController.update) 

router.delete('/:id', productController.delete)

module.exports = router;