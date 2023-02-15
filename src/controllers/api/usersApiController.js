const db = require('../../database/models')

const controller = {

   async list(req, res) {

      try {

         let users = await db.User.findAll({
            attributes: ['id', 'mail', 'name', 'last_name', 'picture']
         })
         users = users.map(user => {
            return {
               detail: `http://127.0.0.1:8000/api/users/${user.dataValues.id}`,
               ...user.dataValues
            }
         })

         res.status(200).json({
            count: users.length,
            users
         })

      } catch(err) {
         console.error(err)
         res.status(500).json({
            status: 500,
            description: 'server error'
         })
      }

   },

   async userInfo(req, res) {

      try {

         const user = await db.User.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'is_admin']}
         })

         res.status(200).json({
            view_all_users: `http://127.0.0.1:8000/api/users`,
            ...user.dataValues
         })

      } catch(err) {
         console.error(err)
         res.status(500).json({
            status: 500,
            description: 'server error'
         })
      }

   },

}

module.exports = controller