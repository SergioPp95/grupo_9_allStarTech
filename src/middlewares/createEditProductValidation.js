const path = require("path");
const { check } = require('express-validator') //req validator

const validations = [
	check('name').notEmpty().withMessage('Tienes que insertar el nombre del producto'),
	check('price').notEmpty().withMessage('Tienes que insertar el precio del producto'),
	check('discount').notEmpty().withMessage('Tienes que insertar el descuento del producto'),
	check('category').notEmpty().withMessage('Tienes que elegir la categoria del producto'),
	check('image1').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}),
    check('image2').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}),
    check('description').notEmpty().withMessage('tienes que escribir una descripcion del producto')
]

module.exports = validations