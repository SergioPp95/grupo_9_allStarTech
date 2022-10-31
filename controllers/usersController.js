const controller = {
    login: (req,res) => res.render('./users/login'),
    register: (req,res) => res.render('./users/register'),
    cart: (req,res) => res.render('./users/productCart'),
    crud: (req,res) => res.render('./users/crud')
}

module.exports = controller;