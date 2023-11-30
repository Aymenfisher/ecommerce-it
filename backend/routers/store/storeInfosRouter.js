const storeInfosRouter = require('express').Router()
const {getStoreInfos} = require('../../controllers/store/storeInfosController')

storeInfosRouter.get('/',getStoreInfos)

module.exports = storeInfosRouter