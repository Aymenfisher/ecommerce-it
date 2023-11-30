const adminStoreInfosRouter = require('express').Router()
const {modifyStoreInfos} = require('../../controllers/admin/adminStoreInfosController')

//modify store infos route
adminStoreInfosRouter.post('/',modifyStoreInfos)

module.exports=adminStoreInfosRouter
