//imports
const mongoose = require('mongoose')

// creating order schema

const orderSchema = new mongoose.Schema({
    products: [{
        _id: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type:Number,
            required:true
        },
        discountPercentage: {
            type:Number,
            required:true
        },
        discountPrice: {
            type:Number,
            required:true
        },
        discountedPrice:{
            type:Number,
            required:true
        },
        total: {
            type:Number,
            required:true
        },
        category: {
            type:String,
            required:true
        },
        brand: {
            type:String,
            required:true
        }
    }],
    client: {
        name: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:true
        },
        state: {
            type:String,
            required:true
        },
        phones: [String]
    },
    paymentMethod:String
    ,
    total: {
        type:Number,
        required:true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: 'throw'
})

// orders model
const orders = mongoose.model('Orders', orderSchema)
//exporting the model
module.exports = orders