const fs = require ('fs');
const path = require ('path');

const usersPath = path.join(__dirname, '../data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

const controller = {
    login: (req, res) => res.render('./users/login'),
    loginProcess: (req,res) => {

    },
    register: (req, res) => res.render('./users/register'),
    registerProcess: (req,res) => {

    },
    profile: (req,res) => {

    },
    cart: (req, res) => res.render('./users/product-cart'),
}

module.exports = controller;