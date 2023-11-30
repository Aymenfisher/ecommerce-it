const storeOrdersRouter = require('express').Router()
const { createOrder} = require('../../controllers/store/storeOrdersController')

// create order

storeOrdersRouter.post('/',createOrder)


module.exports= storeOrdersRouter