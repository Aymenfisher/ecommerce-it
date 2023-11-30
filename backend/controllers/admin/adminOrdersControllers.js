//imports
const Orders = require('../../models/ordersModel')
const mongoose = require('mongoose')


// get all orders
const getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find().sort({createdAt:-1})
        return res.json(orders)
    } catch (error) {
        return next(error)
    }
}

//get a single order 
const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const order = await Orders.findById(id)
        //check if order exists
        if (!order) {
            throw { status: 404 }
        }

        return res.json(order)
    } catch (error) {
        return next(error)
    }
}



// Detele order

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const order = await Orders.findById(id)
        //check if order exists
        if (!order || !Object.keys(order).length) {
            throw { status: 404 }
        }

        //deleting record from db
        const deletedOrder = await Orders.findByIdAndDelete(id)
        
        return res.json({
            success: true,
            deletedId: deletedOrder._id
        })
    } catch (error) {
        return next(error)
    }
}

// set order as completed

const setOrderCompleted = async (req, res, next) => {
    try {
        const { id } = req.params

        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const order = await Orders.findById(id)
        //check if order exists
        if (!order) {
            throw { status: 404 }
        }
        // check if the order is not completed
        if (order.isCompleted) {
            throw { status: 400 }
        }

        //setting the order as completed
        const updatedOrder = await Orders.findByIdAndUpdate(id,{isCompleted:true},{new:true,runValidators:true})

        //confirming
        if(!updatedOrder.isCompleted){
            throw {status:500}
        }

        return res.json({
            success:true,
            _id:id,
            updatedAt:updatedOrder.updatedAt
        })
    }catch(error){
        return next(error)
    }

}


module.exports = {
    getOrders,
    getOrder,
    deleteOrder,
    setOrderCompleted
}
