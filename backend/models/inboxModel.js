const mongoose = require('mongoose')


const inboxSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:100,
        required:true
    },
    email:{
        type:String,
        match:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    },
    phone:{
        type:String,
        match:  /^[0-9]\d*$/
    },
    subject:{
        type:String,
        required:true,
        maxLength: 100
    },
    message:{
        type:String,
        required:true
    },
    isOpened:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const inboxModel = mongoose.model('Inbox',inboxSchema)

module.exports = inboxModel