const adminInboxRouter = require('express').Router()
const {getMessages,deleteMessage,setMessageViewed} = require('../../controllers/admin/adminInboxController')

//get messages
adminInboxRouter.get('/',getMessages)

//delete message
adminInboxRouter.delete('/:id',deleteMessage)

//set message as viewed
adminInboxRouter.patch('/:id',setMessageViewed)

module.exports = adminInboxRouter