//imports
const mongoose = require('mongoose')

// creating product schema

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 120
    },
    price: {
        type: Number,
        required: true,
        max: 9999999,
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0,
        max: 100,
        min:0
    },
    discountPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    discountedPrice: {
        type: Number,
        min:0
    }
    ,
    inStock: {
    type: Boolean,
    default: true
},
    category: {
    type: String,
    required: true,
},
    brand: {
    type: String,
    required: true
}
    ,
    shortDescription: {
    type: String,
    required: true,
    maxLength: 70
},
    detailedDescription: String,
    specs: [{ title: String, value: String }],
    images: [],
    mainImage: {
    type: String,
    default: ''
},
    isNewProduct: {
    type: Boolean,
    default: false
},
    isTopProduct: {
    type: Boolean,
    default: false,
},
    isOnline: {
    type: Boolean,
    default: true
}
}, {
    timestamps: true,
        strict: 'throw'
}
)



// products model
const products = mongoose.model('Products', productsSchema)
//exporting the model
module.exports = products