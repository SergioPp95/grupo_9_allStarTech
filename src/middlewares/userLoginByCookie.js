const fs = require("fs")
const path = require("path")
const usersPath = path.join(__dirname, '../data/users.json')
let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

function userLogin(req, res, next) {
   // Pregunta si existe el cookie
   if(req.cookies.userLogged) {
      // Filtra usuario por email
      let user = users.find( user => user.email == req.cookies.userLogged)
      
      // Elimina contraseña de user por seguridad
      delete user.contrasena
      
      // Incluye al usuario en session
      req.session.userLogged = user
      
      // Redirige a página del perfil
      res.redirect("/user/profile")
   } else {
      // Si cookie no exite, sigue con próximo middleware o controlador
      next()
   }
}

module.exports = userLogin