const db = require('../../database/models')

const controller = {

   async list(req, res) {

      try {
         
         const categories = await db.Category.findAll({
            attributes: ['name']
         })
         let products = await db.Product.findAll({
            attributes: ['id', 'name', 'description'],
            include: {association: 'category', attributes: ['name']}
         })
         
         let countResult = {}

         categories.map( category => {
            category.dataValues.count = 0
            products.map( product => product.category.name === category.dataValues.name ? category.dataValues.count++ : null )
            countResult[category.dataValues.name] = category.dataValues.count
         })

         products = products.map(product => {
            return {
               detail: `http://127.0.0.1:8000/api/products/${product.dataValues.id}`,
               ...product.dataValues
            }
         })

         res.status(200).json({
            count: products.length,
            countByCategory: countResult,
            products
         })

      } catch(err) {
         console.error(err)
         res.status(500).json({
            status: 500,
            description: 'server error'
         })
      }
      
   },
   
   async productInfo(req, res) {

      try {

         const product = await db.Product.findByPk(req.params.id, {
            include: {association: 'category', attributes: ['name']}
         })

         res.status(200).json({
            view_all_products: `http://127.0.0.1:8000/api/products`,
            ...product.dataValues
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