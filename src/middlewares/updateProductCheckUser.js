const db = require('../database/models')

async function updateProductCheck(req, res, next) {

   const product = await db.Product.findByPk(req.params.id, {
      attributes: ['seller_id']
   })

   if(product.dataValues.seller_id === req.session.userLogged.id) {
      next()
   } else {
      res.redirect(`/products/${req.params.id}`)
   }

}

module.exports = updateProductCheck