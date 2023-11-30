const storeInboxRouter = require('express').Router()
const {postMesssage} = require('../../controllers/store/storeInboxController')

storeInboxRouter.post('/',postMesssage)


module.exports = storeInboxRouter