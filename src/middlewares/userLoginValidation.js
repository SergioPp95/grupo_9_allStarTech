const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const validations = [
    check('email').notEmpty().withMessage('El email es obligatiorio').bail()
        .isEmail().withMessage('El formato no coincide con un correo electronico').bail()
        .custom(async value => {
            valid = await db.User.count({
                    where: {mail: value}
            })
            
            if (!valid) {
                throw new Error('No existe una cuenta con ese email')
            }
            return true;
        }),
    check('contrasena').custom(async (value, { req }) => {
        const user = await db.User.findOne({
            where: {
                mail: req.body.email
            },
            attributes: ['password']
        })
        if (user) {
            const verified = bcrypt.compareSync(value, user.dataValues.password)
            if (!verified) {
                throw new Error('Contraseña incorrecta');
            }
        }
        return true;
    }),
]

module.exports = validations;