const middleware = {
   forUsers: (req, res, next) => {
      // Pregunta si el usuario está en sesión
      if(req.session.userLogged) {
         // Si está logeado se sigue con el siguiente middleware o controlador
         next()
      } else {
         // Si no está logeado se redirige a login
         res.redirect("/user/login")
      }
   },
   forGuests: (req, res, next) => {
      // Pregunta si el usuario no está en sesión
      if(!req.session.userLogged) {
         // Si no está logeado se sigue con el siguiente middleware o controlador
         next()
      } else {
         // Si está logeado se redirige a profile
         res.redirect("/user/profile")
      }
   }
}

module.exports = middleware