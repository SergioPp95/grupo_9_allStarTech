const path = require("path");
const { check } = require('express-validator'); //req validator
const { unlinkSync } = require("fs");

const validations = [
	check('name').custom((value) => {
		if (value.length < 5) {
			throw new Error('El nombre es obligatiorio (5 caracteres obligatorios)')
		}
		return true;
	}),
	check('price').notEmpty().withMessage('Tienes que insertar el precio del producto')
		.custom((value) => {
			const regex = /^\d+$/
			let valid = regex.test(value)
			if (!valid) {
				throw new Error('Valor no válido');
			}
			return true
		}),
	check('discount').custom((value) => {
		if (value) {
			const regex = /^\d+$/
			let valid = regex.test(value)
			if (!valid || value > 100 || value < 0) {
				throw new Error('Valor no válido');
			}
		}

		return true
	}),
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
		if (req.files.image2) {
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