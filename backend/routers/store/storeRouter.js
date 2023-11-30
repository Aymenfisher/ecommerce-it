const storeRouter = require('express').Router()
const storeProductsRouter = require('./storeProductsRouter')
const storeOrdersRouter = require('./storeOrdersRouter')
const storeInboxRouter = require('./storeInboxRouter')
const storeInfosRouter = require('./storeInfosRouter')
// store products sub-route

storeRouter.use('/products',storeProductsRouter)

// store orders sub-route (only create order)

storeRouter.use('/orders',storeOrdersRouter)


// store inbox sub-oute : only post a message

storeRouter.use('/inbox',storeInboxRouter)

// store informations sub-route: only get infos

storeRouter.use('/storeInfos',storeInfosRouter)


module.exports = storeRouter