const controller = {
    index: (req, res) => {
        res.render('index', { user: req.session.userLogged })
    },
}

module.exports = controller;