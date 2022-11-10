const fs = require ('fs');
const path = require ('path');

const productsPath = path.join(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))




const controller = {
  index: (req, res) => {
    res.render('./products/products', { products })
  },
  create: (req, res) => {
    res.render('./products/product-create')
    // Codigo
  },
  store: (req, res) => {
    // Codigo
    res.redirect('/products/' + req.params.id)
  },
  detail: (req, res) => {
    /*let product = products.find( (elem) => elem.id == req.params.id );*/
    let id = req.params.id
    let product = products.find(product => {
      return product.id == id
    })
    res.render('./products/product-detail', { product })
  },
  edit: (req, res) => {
    // Codigo
    let product = products.find(element => element.id == req.params.id)

    res.render('./products/product-edit', { product })
  },
  update: (req, res) => {
    // Codigo
    res.redirect('/products/' + req.params.id)
  },
  delete: (req, res) => {
    // Codigo
    let id = req.params.id
    let productsFiltered = products.filter(element => element.id != id)

    // fs.writefilesync

    res.redirect('/products/')
  },
}

module.exports = controller;


