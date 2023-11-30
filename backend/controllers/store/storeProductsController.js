//imports
const Products = require('../../models/productsModel');


// get all products for store (only online products)
const getStoreProducts = async (req, res, next) => { 
    try {
        const products = await Products.find({isOnline:true},{createdAt:0,updatedAt:0,__v:0,isOnline:0})
        return res.json(products)
    } catch (error) {
        return next(error)
    }
}

module.exports={
    getStoreProducts
}
