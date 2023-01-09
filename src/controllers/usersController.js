const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const db = require('../database/models')

const controller = {
   login: (req, res) => res.render('./users/login'),

   checkLogin: async (req, res) => {
      // Trae info del usuario por email, si coincide
      const user = await db.User.findOne({
         where: {
            mail: req.body.email
         }
      })

      if (user.dataValues) {
         // Verifica si la contraseña es correcta
         const verified = bcrypt.compareSync(req.body.contrasena, user.dataValues.password)
         console.log(verified);

         if (verified) {
            // Elimina contraseña de user por seguridad
            delete user.dataValues.password

            // Incluye al usuario en session
            req.session.userLogged = user.dataValues

            // Si aceptó en login, incluye al usuario en cookies para logearlo
            req.body.recordar ? res.cookie("userLogged", user.dataValues.mail, { maxAge: 1000 * 60 * 5 }) : null // Cookie se guarda por 5 min

            // Redirige a página del perfil si credenciales son correctas
            res.redirect("/user/profile")
         } else {
            // Si contraseña es incorrecta redirige a login
            res.redirect("/user/login")
         }

      } else {
         // Si email es incorrecto redirige a login
         res.redirect("/login")
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
         
    profile: (req, res) => res.render('./users/profile', {user: req.session.userLogged}),

    logout: (req, res) => {
      
      // Se elimina al user de session
      req.session.userLogged = null

      res.redirect("/")

    },

   cart: (req, res) => res.render('./users/productCartCorreccion'),
}

module.exports = controller;