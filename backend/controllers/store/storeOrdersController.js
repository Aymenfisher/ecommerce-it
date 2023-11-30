//imports
const Orders = require('../../models/ordersModel')
const Products = require('../../models/productsModel')
const displayTwoDecimalsIfFloat = require('../../utils/displayTwoDecimalsIfFloat')

// create new order

const createOrder = async (req, res, next) => {
    try {
        const orderData = req.body
        // ensuring the request body is valid and non empty
        if (!orderData || !Object.keys(orderData).length) {
            throw { status: 400 }
        }
        // contructing order details : 
        const order = {
            products:[],
            client:orderData.client,
            total:0
        }
        for(const product of orderData.products){
            const productData = await Products.findById(product._id)
            if(productData){
                const productPrice = productData.discountedPrice
                const productTotal = displayTwoDecimalsIfFloat(productPrice*product.quantity)
                order.total += productTotal
                order.products.push({
                    _id:productData._id,
                    title:productData.title,
                    category:productData.category,
                    brand:productData.brand,
                    price:productData.price,
                    discountPrice:productData.discountPrice,
                    discountPercentage:productData.discountPercentage,
                    discountedPrice:productData.discountedPrice,
                    quantity:product.quantity,
                    total:productTotal
                })
            }else{
                throw {status:404}
            }
        }
        // using 2 decimals in price: ex: 59.99 and not 59.999998
        order.total = displayTwoDecimalsIfFloat(order.total)
        //checking order total equality
        if(orderData.total != order.total){
            throw {status:400}
        }
        // create new record to db
        const newOrder = new Orders(order)
        const savedOrder = await newOrder.save() // saving order to db
        const orderToDisplay = {
            _id:savedOrder._id,
            products:savedOrder.products,
            client:savedOrder.client,
            total:savedOrder.total
        }
        return res.status(201).json(orderToDisplay)
    } catch (error) {
        if(['ValidationError','CastError','StrictModeError'].includes(error.name)){ // possible mongoose errors
            error.status = 400
            return next(error)
        }
        return next(error)
    }
}

module.exports={
    createOrder
}