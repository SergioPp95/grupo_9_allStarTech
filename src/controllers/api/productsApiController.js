const db = require('../../database/models')

const baseUrl = 'http://127.0.0.1:8000/api/products'

const controller = {

   async list(req, res) {

      try {

         const itemsPerPage = 5

         const categories = await db.Category.findAll({
            attributes: ['name']
         })
         let products = await db.Product.findAll({
            attributes: ['id', 'name', 'description', 'img1', 'price'],
            include: { association: 'category', attributes: ['name'] },
            limit: req.query.page ? itemsPerPage : null,
            offset: req.query.page ? (Number(req.query.page) - 1) * itemsPerPage : 0
         })

         let countResult = {}

         categories.map(category => {
            category.dataValues.count = 0
            products.map(product => product.category.name === category.dataValues.name ? category.dataValues.count++ : null)
            countResult[category.dataValues.name] = category.dataValues.count
         })

         products = products.map(product => {
            return {
               detail: `${baseUrl}/${product.dataValues.id}`,
               ...product.dataValues
            }
         })

         const productQuantity = await db.Product.count()

         res.status(200).json({
            count: productQuantity,
            page: req.query.page ? `${req.query.page} de ${Math.ceil(productQuantity / itemsPerPage)}` : `Todos los productos mostrados`,
            next: req.query.page < Math.ceil(productQuantity / itemsPerPage) || req.query.page == undefined ? `${baseUrl}?page=${(Number(req.query.page) || 0) + 1}` : null,
            previous: req.query.page > 1 ? `${baseUrl}?page=${Number(req.query.page) - 1}` : null,
            countByCategory: countResult,
            products
         })

      } catch (err) {
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
            include: { association: 'category', attributes: ['name'] }
         })

         res.status(200).json({
            view_all_products: baseUrl,
            ...product.dataValues
         })

      } catch (err) {
         console.error(err)
         res.status(500).json({
            status: 500,
            description: 'server error'
         })
      }

   },

}

module.exports = controller