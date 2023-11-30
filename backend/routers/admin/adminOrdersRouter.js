const adminOrdersRouter = require('express').Router()
const { getOrders, getOrder, deleteOrder, setOrderCompleted} = require('../../controllers/admin/adminOrdersControllers')

// get all orders

adminOrdersRouter.get('/',getOrders)

// get a single order

adminOrdersRouter.get('/:id',getOrder)

// Delete an order

adminOrdersRouter.delete('/:id',deleteOrder)

// set an order as completed
adminOrdersRouter.patch('/:id',setOrderCompleted)


module.exports= adminOrdersRouter