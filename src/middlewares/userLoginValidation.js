const { check } = require('express-validator');
const path = require('path');
const db = require('../database/models');

const validations = [
    check('email').notEmpty().withMessage('El email es obligatiorio').bail()
        .isEmail().withMessage('El formato no coincide con un correo electronico')
        .custom(async (value) => {
            valid = await db.User.findOne(
                {
                    where: {
                        mail: value
                    }
                }
            )
            console.log(valid);
            if (!valid) {
                throw new Error('No existe una cuenta con ese email')
            }
            return true;
        }),
    check('contrasena').custom(async (value, { req }) => {
        const user = await db.User.findOne({
            where: {
                mail: req.body.email
            }
        })
        if (user) {
            const verified = bcrypt.compareSync(value, user.dataValues.password)
            if (!verified) {
                throw new Error('Contraseña incorrecta');
            }
        } else {
            throw new Error('Contraseña incorrecta')
        }
        return true;
    }),
]

module.exports = validations;