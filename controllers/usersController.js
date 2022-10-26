const controller = {
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    cart: (req,res) => res.render('prodcutCart')
}

module.exports = controller;