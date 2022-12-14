const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');

//const productsPath = path.join(__dirname, '../data/products.json')
//let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

const controller = {
  index: async (req, res) => {
    let products = await db.Product.findAll()
    res.render('./products/products', { products })
    // CODIGO ACA
  },
  create: async (req, res) => {
    const categories = await db.Category.findAll()
    res.render('./products/product-create', { categories:categories })
  },
  store: async (req, res) => {
    const resultValidation = validationResult(req);

    const categories = await db.Category.findAll()

    if (resultValidation.errors.length > 0) {
      return res.render('./products/product-Create', {
        errors: resultValidation.mapped(),
        oldData: req.body,
        categories:categories
      });
    } else {

      let product = {
        name: req.body.name,
        description: req.body.description,
        img1: req.files.image1[0].filename,
        img2: req.files.image2[0].filename,
        category_id: req.body.category,
        price: req.body.price,
        discount: req.body.discount,
      }
      console.log(product)

      await db.Product.create(product)

      res.redirect('/products/')
    }
  },
  detail: async (req, res) => {
    let product = await db.Product.findByPk(req.params.id)
    res.render('./products/product-detail', { product: product.dataValues })
  },
  edit: async (req, res) => {
    const categories = await db.Category.findAll()
    const product = await db.Product.findByPk(req.params.id)
    res.render('./products/product-edit', { product: product, categories: categories })
  },
  update: async (req, res) => {
    const resultValidation = validationResult(req);
    const categories = await db.Category.findAll()

    if (resultValidation.errors.length > 0) {
      return res.render('./products/product-Create', {
        errors: resultValidation.mapped(),
        oldData: req.body,
        categories:categories
      });
    } else {
      // Filtra producto a editar
      const product = await db.Product.findByPk(req.params.id)

      // Elimina imagenes anteriores del producto
      req.files.image1 ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img1)) : null
      req.files.image2 ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img2)) : null

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

      // Reenvia a p??gina del producto reci??n editado
      res.redirect('/products/' + req.params.id)
    }
  },
  delete: async (req, res) => {

    // Elimina imagen actual del producto a borrar
    const product = await db.Product.findByPk(req.params.id)
    fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img1));
    fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.img2));

    await db.Product.destroy({
      where: {
        id: req.params.id
      }
    })

    // Redirije a p??gina principal de productos
    res.redirect("/products");
  }
}

module.exports = controller;


