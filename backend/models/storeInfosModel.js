//imports
const mongoose = require('mongoose')

// creating store schema

const storeSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        maxLength:130
    },
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        default:'Algiers, Algeria'
    },
    mapsLocation:{
        type:String,
        default:'https://www.google.com/maps/place/Algiers/@36.7434437,3.1410169' // algiers
    },
    about:{
        type:String,
        required:true
    },
    phones:{
        type:[],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    socialMedia:{
        facebook:String,
        twitter:String,
        instagram:String,
        youtube:String,
    }
},{
    timestamps:true,
    strict:'throw'
})

// store model
const storeInfos = mongoose.model('storeInfos',storeSchema)
//exporting the model
module.exports = storeInfos