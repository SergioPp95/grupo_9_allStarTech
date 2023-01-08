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
  create: (req, res) => {
    res.render('./products/product-create')
  },
  store: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('./products/product-Create', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    } else {

      let product = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        imageMain: req.files.image1[0].filename,
        imageOther: req.files.image2[0].filename,
        category: req.body.category,
        price: req.body.price,
        discount: req.body.discount,
      }

      products.push(product)
      fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));

      res.redirect('/products/')
    }

    // CODIGO ACA
  },
  detail: async (req, res) => {
    let product = await db.Product.findByPk(req.params.id)
    res.render('./products/product-detail', { product: product.dataValues })
  },
  edit: (req, res) => {
    // Codigo
    const product = products.find(element => element.id == req.params.id) // CODIGO ACA

    res.render('./products/product-edit', { product })

  },
  update: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('./products/product-Create', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    } else {


      // Filtra producto a editar
      const product = products.find(element => element.id == req.params.id)

      // Elimina imagenes anteriores del producto
      req.files.image1 ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.imageMain)) : null
      req.files.image2 ? fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.imageOther)) : null

      // Asigna nuevos valores a cada atributo
      product.id = req.params.id
      product.name = req.body.name
      product.description = req.body.description
      product.imageMain = req.files.image1 ? req.files.image1[0].filename : product.imageMain
      product.imageOther = req.files.image2 ? req.files.image2[0].filename : product.imageOther
      product.category = req.body.category
      product.price = req.body.price
      product.discount = req.body.discount

      // Reescribe archivo json
      fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));

      // Reenvia a página del producto recién editado
      res.redirect('/products/' + req.params.id)
    }
    // CODIGO ACA
  },
  delete: (req, res) => {

    // Elimina imagen actual del producto a borrar
    const product = products.find(element => element.id == req.params.id)
    fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.imageMain));
    fs.unlinkSync(path.join(__dirname, "../../public/images/products", product.imageOther));

    // Filtra lista de productos sin producto a borrar, para sobreescribir en .json
    products = products.filter(element => element.id != req.params.id);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));

    // Redirije a página principal de productos
    res.redirect("/products");

    // CODIGO ACA
  },
}

module.exports = controller;


