const controller = {
    login: (req,res) => res.render('./users/login'),
    register: (req,res) => res.render('./users/register'),
    cart: (req,res) => res.render('./users/productCart')
}

module.exports = controller;