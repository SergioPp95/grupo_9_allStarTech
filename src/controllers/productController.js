const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const controller = {

  index: async (req, res) => {
    let products = await db.Product.findAll()
    res.render('./products/products', { products, user: req.session.userLogged })
    // CODIGO ACA
  },

  search: async (req, res) => {
    const search = req.body.search;
    const results = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: '%' + search + '%'
        }
      }
    })
    res.render('./products/products', { products: results, user: req.session.userLogged })
  },

  create: async (req, res) => {
    const categories = await db.Category.findAll()
    res.render('./products/product-create', { categories: categories, user: req.session.userLogged })
  },

  store: async (req, res) => {
    const resultValidation = validationResult(req);
    
    const categories = await db.Category.findAll()

    if (resultValidation.errors.length > 0) {
      req.files.image1 ? fs.unlinkSync(req.files.image1[0].path) : null
      req.files.image2 ? fs.unlinkSync(req.files.image2[0].path) : null
      res.render('./products/product-create', {
        errors: resultValidation.mapped(),
        oldData: req.body,
        categories: categories,
        user: req.session.userLogged
      });
    } else {

      const defaultImg = "productDefault.png"

      let product = {
        name: req.body.name,
        description: req.body.description,
        img1: req.files.image1 ? req.files.image1[0].filename : defaultImg,
        img2: req.files.image2 ? req.files.image2[0].filename : defaultImg,
        category_id: req.body.category,
        seller_id: req.session.userLogged.id,
        price: req.body.price,
        discount: req.body.discount,
      }

      await db.Product.create(product)

      res.redirect('/products/')
    }
  },

  detail: async (req, res) => {
    let product = await db.Product.findByPk(req.params.id, { include: [{ association: "seller" }] })
    res.render('./products/product-detail', { product: product.dataValues, user: req.session.userLogged })
  },

  edit: async (req, res) => {
    const categories = await db.Category.findAll()
    const product = await db.Product.findByPk(req.params.id)
    res.render('./products/product-edit', { product: product, categories: categories, user: req.session.userLogged })
  },

  update: async (req, res) => {
    const resultValidation = validationResult(req);
    const categories = await db.Category.findAll()

    if (resultValidation.errors.length > 0) {
      req.files.image1 ? fs.unlinkSync(req.files.image1[0].path) : null
      req.files.image2 ? fs.unlinkSync(req.files.image2[0].path) : null
      return res.render('./products/product-Create', {
        errors: resultValidation.mapped(),
        oldData: req.body,
        categories: categories,
        user: req.session.userLogged
      });
    } else {
      // Filtra producto a editar
      const product = await db.Product.findByPk(req.params.id)

      const defaultImg = "productDefault.png"

      // Elimina imagenes anteriores del producto
      try {
         req.files.image1 ? product.img1 != defaultImg ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img1)) : null : null
         req.files.image2 ? product.img1 != defaultImg ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img2)) : null : null
      } catch(err) {
         console.error(err)
      }

      // Asigna nuevos valores a cada atributo
      await db.Product.update({
        name: req.body.name,
        description: req.body.description,
        img1: req.files.image1 ? req.files.image1[0].filename : product.img1,
        img2: req.files.image2 ? req.files.image2[0].filename : product.img2,
        category_id: req.body.category,
        price: req.body.price,
        discount: req.body.discount,
      }, {
        where: {
          id: req.params.id,
        }
      })

      // Reenvia a página del producto recién editado
      res.redirect('/products/' + req.params.id)
    }
  },

  delete: async (req, res) => {

    const product = await db.Product.findByPk(req.params.id)

    // Elimina imagen actual del producto a borrar

    const defaultImg = "productDefault.png"

    try {
      if (product.img1 != defaultImg) fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img1));
      if (product.img2 != defaultImg) fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img2));
    } catch(err) {
      console.error(err)
    }

    await db.Product.destroy({
      where: {
        id: req.params.id
      }
    })

    // Redirije a página principal de productos
    res.redirect("/user/products");
  }
}

module.exports = controller;


