const path = require("path");
const { check } = require('express-validator')

const validations = [
	check('name').notEmpty().withMessage('Tienes que insertar el nombre del producto'),
	check('price').notEmpty().withMessage('Tienes que insertar el precio del producto'),
	check('discount').notEmpty().withMessage('Tienes que insertar el descuento del producto'),
	check('category').notEmpty().withMessage('Tienes que elegir la categoria del producto'),
	check('image1').custom(function (value, { req }) {
		if (req.files.image1) {
			let extension = (path.extname(req.files.image1[0].originalname)).toLowerCase();
			if (!(['.jpg', '.png', '.jpeg'].includes(extension))) {
				throw new Error('Tienes que subir una imagen en formato:'['.jpg', '.png', '.jpeg'].join(', '))
			}
		}

		return true
	}),
	check('image2').custom(function (value, { req }) {
		if (req.files.image1) {
			let extension = (path.extname(req.files.image2[0].originalname)).toLowerCase();
			if (!(['.jpg', '.png', '.jpeg'].includes(extension))) {
				throw new Error('Tienes que subir una imagen en formato:'['.jpg', '.png', '.jpeg'].join(', '))
			}
		}

		return true
	}),
	check('description').notEmpty().withMessage('tienes que escribir una descripcion del producto')
]

module.exports = validations