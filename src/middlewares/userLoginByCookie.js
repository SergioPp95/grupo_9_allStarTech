const fs = require("fs")
const path = require("path")
const db = require('../database/models');

async function userLogin(req, res, next) {

   if (req.cookies.userLogged) {

      let user = await db.User.findOne({
         where: {
            mail: req.cookies.userLogged
         }
      })


      delete user.dataValues.password;


      req.session.userLogged = user.dataValues;

      res.redirect("/user/profile")
   } else {

      next()
   }
}

module.exports = userLogin