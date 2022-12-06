const { check } = require('express-validator');
const path = require('path')

const validations = [
    check('nombre').notEmpty().withMessage('El nombre es obligatiorio'),
    check('apellido').notEmpty().withMessage('El apellido es obligatiorio'),
    check('email').notEmpty().withMessage('El email es obligatiorio').bail()
    .isEmail().withMessage('El formato no coincide con un correo electronico'),
    check('contrasena').notEmpty().withMessage('La contraseña es obligatioria'),
    check('contrasena2').notEmpty().withMessage('La contraseña es obligatioria'),
    check('imagenPerfil').custom((value, {req}) =>{
        let file = req.file;
        if (!file) {
            throw new Error('La imagen es obligatoria');
        };
        return true;
    })
];


module.exports = validations;