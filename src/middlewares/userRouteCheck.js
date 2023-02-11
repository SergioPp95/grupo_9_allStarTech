const middleware = {
   forUsers: (req, res, next) => {

      if (req.session.userLogged) {

         next()
      } else {

         res.redirect("/user/login")
      }
   },
   forGuests: (req, res, next) => {

      if (!req.session.userLogged) {

         next()
      } else {

         res.redirect("/user/profile")
      }
   }
}

module.exports = middleware