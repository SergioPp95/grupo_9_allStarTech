const fs = require("fs")
const path = require("path")
const db = require('../database/models');

async function userLogin(req, res, next) {
   // Pregunta si existe el cookie
   if (req.cookies.userLogged) {
      // Filtra usuario por email
      let user = await db.User.findOne({
         where: {
            mail: req.cookies.userLogged
         }
      })

      // Elimina contraseña de user por seguridad
      delete user.dataValues.password;

      // Incluye al usuario en session
      req.session.userLogged = user.dataValues;

      // Redirige a página del perfil
      res.redirect("/user/profile")
   } else {
      // Si cookie no exite, sigue con próximo middleware o controlador
      next()
   }
}

module.exports = userLogin