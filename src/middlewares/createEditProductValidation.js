const path = require("path");
const { check } = require('express-validator') //req validator

const validations = [
	check('name').notEmpty().custom((value) => {
        if (value.length < 6) {
            throw new Error('El nombre es obligatiorio (5 caracteres obligatorio)')
        }
        return true;
    }),
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
	check('description').custom((value) => {
        if (value && value.length < 20) {
            throw new Error('La descripción debe contener como minimo 20 caracteres')
        }
        return true;
    })
]

module.exports = validations