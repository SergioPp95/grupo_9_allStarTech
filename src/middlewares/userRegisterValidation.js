const { check } = require('express-validator');
const path = require('path');
const db = require('../database/models');

const validations = [
    check('nombre').custom((value) => {
        if (value.length < 2) {
            throw new Error('El nombre es obligatiorio (2 caracteres obligatorio)')
        }
        return true;
    }),
    check('apellido').custom((value) => {
        if (value.length < 2) {
            throw new Error('El apellido es obligatiorio (2 caracteres obligatorio)')
        }
        return true;
    }),
    check('email').notEmpty().withMessage('El email es obligatiorio').bail()
        .isEmail().withMessage('El formato no coincide con un correo electronico')
        .custom(async (value) => {
            valid = await db.User.count(
                {
                    where: {
                        mail: value
                    }
                }
            )
            
            if (valid) {
                throw new Error('Ya existe una cuenta con ese mail')
            }
            return true;
        }),
    check('contrasena').notEmpty().withMessage('La contraseña es obligatioria')
        .custom((value) => {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            const valid = regex.test(value);
            if (!valid) {
                throw new Error('Obligatorio: mínimo 8 caracteres, 1 mayúscula, 1 minúscula y un caracter especial (@$!%*#?&)')
            };
            return true;
        }),
    check('contrasena2').notEmpty().withMessage('La contraseña es obligatioria')
        .custom((value, { req }) => {
            if (value != req.body.contrasena) {
                throw new Error('Las contraseñas tienen que coincidir');
            }
            return true;
        }),
    check('imagenPerfil').custom((value, { req }) => {
        if (req.file) {
            let extension = (path.extname(req.file.originalname)).toLowerCase();
            if (!(['.jpg', '.png', '.jpeg'].includes(extension))) {
                throw new Error('Tienes que subir una imagen en formato .jpg, .png, .jpeg')
            }
        }

        return true
    })
];


module.exports = validations;