let products = [
    {
        id:0,
        name:'',
        description:'',
        price:'',
    }
]

const controller = {
    index: (req, res) => (res.render('./products/productResults',{products: products})),
    detail: (req, res) => {
        let product = products.find( (elem) => elem.id == req.params.id );
        res.render('./products/productDetail',{product: product})
    }
}

module.exports = controller;