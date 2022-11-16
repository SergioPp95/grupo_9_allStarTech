const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json')
let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

const controller = {
  index: (req, res) => {
    res.render('./products/products', { products })
  },
  create: (req, res) => {
    res.render('./products/product-create')
    // Codigo
  },
  store: (req, res) => {
    let product = {
      id: Date.now(),
      name: req.body.name,
      description: req.body.description,
      imageMain: "/images/" + req.files.image1[0].filename,
      imageOther: "/images/" + req.files.image2[0].filename,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
    }

    products.push(product)
    fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));

    res.redirect('/products/')
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
    const product = products.find(element => element.id == req.params.id)

    res.render('./products/product-edit', { product })
  },
  update: (req, res) => {

    // Filtra producto a editar
    const product = products.find(element => element.id == req.params.id)

    // Elimina imagenes anteriores del producto
    fs.unlinkSync(path.join(__dirname, "../../public", product.imageMain))
    fs.unlinkSync(path.join(__dirname, "../../public", product.imageOther))

    // Asigna nuevos valores a cada atributo
    product.id = req.params.id
    product.name = req.body.name
    product.description = req.body.description
    product.imageMain = "/images/" + req.files.image1[0].filename
    product.imageOther = "/images/" + req.files.image2[0].filename
    product.category = req.body.category
    product.price = req.body.price
    product.discount = req.body.discount

    // Reescribe archivo json
    fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));

    // Reenvia a página del producto recién editado
    res.redirect('/products/' + req.params.id)
  },
  delete: (req, res) => {

    // Elimina imagen actual del producto a borrar
    const product = products.find(element => element.id == req.params.id)
    fs.unlinkSync(path.join(__dirname, "../../public", product.imageMain));
    fs.unlinkSync(path.join(__dirname, "../../public", product.imageOther));

    // Filtra lista de productos sin producto a borrar, para sobreescribir en .json
    const newProducts = products.filter(element => element.id != req.params.id);
    fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, " "));

    // Redirije a página principal de productos
    res.redirect("/products");
  },
}

module.exports = controller;


