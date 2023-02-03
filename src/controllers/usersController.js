const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const db = require('../database/models')

const controller = {
   login: (req, res) => res.render('./users/login'),

   checkLogin: async (req, res) => {
      const resultValidation = validationResult(req)
      if (resultValidation.errors.length > 0) {
         res.render('./users/login', {
            errors: resultValidation.mapped(),
            oldData: req.body
         })
      } else {

         const user = await db.User.findOne({
            where: {
               mail: req.body.email
            },
            attributes: {exclude: ['password']}
         })
         
         req.session.userLogged = user.dataValues

         req.body.recordar ? res.cookie("userLogged", user.dataValues.mail, { maxAge: 1000 * 60 * 5 }) : null // Cookie se guarda por 5 min

         res.redirect("/user/profile")
      }
   },

   register: (req, res) => res.render('./users/register'),

   addRegister: async (req, res) => {
      const resultValidation = validationResult(req)
      if (resultValidation.errors.length > 0) {
         res.render('./users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
         })
      } else {
         // Se crea el usuario nuevo
         const encrypted = bcrypt.hashSync(req.body.contrasena, 10)
         const defaultPicture = "userDefault.png"
         const newUser = {
            name: req.body.nombre,
            last_name: req.body.apellido,
            mail: req.body.email,
            password: encrypted,
            picture: req.file ? req.file.filename : defaultPicture,
         }
         // Se incluye el usuario nuevo al array de usuarios y se reescribe el archivo JSON con nueva lista
         try {
            await db.User.create(newUser)
         }
         catch (error) {
            console.error(error)
         }

         // Se redirige el cliente a login para que pueda ingresar
         res.redirect("/user/login")
      }
   },

   profile: (req, res) => res.render('./users/profile', { user: req.session.userLogged }),

   logout: (req, res) => {

      // Se elimina al user de session
      req.session.userLogged = null

      res.redirect("/")

   },

   cart: (req, res) => res.render('./users/productCartCorreccion'),
}

module.exports = controller;