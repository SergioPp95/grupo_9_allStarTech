const express = require('express')
const router = express.Router()

const productsApiController = require('../../controllers/api/productsApiController')

router.get('/', productsApiController.list)

router.get('/:id', productsApiController.productInfo)

module.exports = router