const controller = {
    index: (req, res) => (res.render('index')),
    crud: (req, res) => (res.render('crud'))
}

module.exports = controller;