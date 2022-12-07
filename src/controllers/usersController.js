const fs = require ('fs');
const path = require ('path');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

const usersPath = path.join(__dirname, '../data/users.json')
let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

const controller = {
    login: (req, res) => res.render('./users/login'),

    checkLogin: (req, res) => {
      // Trae info del usuario por email, si coincide
      const user = users.find( user => user.email == req.body.email)
      
      if(user) {
         // Verifica si la contraseña es correcta
         const verified = bcrypt.compareSync(req.body.contrasena, user.contrasena)
         
         if(verified) {
            // Elimina contraseña de user por seguridad
            delete user.contrasena

            // Incluye al usuario en session
            req.session.userLogged = user
            
            // Si aceptó en login, incluye al usuario en cookies para logearlo
            req.body.recordar ? res.cookie("userLogged", user.email, {maxAge: 1000 * 60 * 5}) : null // Cookie se guarda por 5 min

            // Redirige a página del perfil si credenciales son correctas
            res.redirect("/user/profile")
         } else {
            // Si contraseña es incorrecta redirige a login
            res.redirect("/user/login")
         }

      } else {
         // Si email es incorrecto redirige a login
         res.redirect("/user/login")
      }
    },

    register: (req, res) => res.render('./users/register'),


    addRegister: (req, res) => {
      const resultValidation = validationResult(req)
      if(resultValidation.errors.length > 0) {
         res.render('./users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
         })
      } else {
         // Se crea el usuario nuevo
      const encrypted = bcrypt.hashSync(req.body.contrasena, 10)
      const defaultPicture = "userDefault.png"

      const newUser = {
         id: users[users.length - 1].id + 1,
         nombre: req.body.nombre,
         apellido: req.body.apellido,
         email: req.body.email,
         contrasena: encrypted,
         imagenPerfil: req.file ? req.file.filename : defaultPicture,
      }

      // Se incluye el usuario nuevo al array de usuarios y se reescribe el archivo JSON con nueva lista
      users.push(newUser)
      fs.writeFileSync(usersPath, JSON.stringify(users, null, " "))

      // Se redirige el cliente a login para que pueda ingresar
      res.redirect("/user/login")
      }
      
      
    },
    
    profile: (req, res) => res.send("Hola " + req.session.userLogged.nombre + ", estás loggeado " + req.cookies.userLogged),

    cart: (req, res) => res.render('./users/productCartCorreccion'),
}

module.exports = controller;
