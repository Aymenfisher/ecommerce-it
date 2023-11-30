const adminRouter = require('express').Router()
const adminProductsRouter = require('./adminProductsRouter')
const adminOrdersRouter = require('./adminOrdersRouter')
const adminStoreInfosRouter = require('./adminStoreInfosRouter')
const adminInboxRouter = require('./adminInboxRouter')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const requireAuth = require('../../middleware/requireAuth')

// admin products subroute

adminRouter.use('/products',requireAuth(),adminProductsRouter)

// admin orders sub-route

adminRouter.use('/orders',requireAuth(),adminOrdersRouter)

// inbox sub-route for admin

adminRouter.use('/inbox',requireAuth(),adminInboxRouter)

//store informations sub-route

adminRouter.use('/storeInfos',requireAuth(['owner']),adminStoreInfosRouter)

// authentication sub-route

adminRouter.use('/auth',authRouter)

// user sub-route

adminRouter.use('/user',requireAuth(['owner']),userRouter)
module.exports = adminRouter