const storeProductsRouter = require('express').Router()
const { getStoreProducts} = require('../../controllers/store/storeProductsController')

// get all products for store

storeProductsRouter.get('/', getStoreProducts)

module.exports = storeProductsRouter