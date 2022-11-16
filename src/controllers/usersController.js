const fs = require ('fs');
const path = require ('path');

const usersPath = path.join(__dirname, '../data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

const controller = {
    login: (req, res) => res.render('./users/login'),
    register: (req, res) => res.render('./users/register'),
    cart: (req, res) => res.render('./users/productCartCorreccion'),
}

module.exports = controller;