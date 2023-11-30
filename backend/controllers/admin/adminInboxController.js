const inboxModel = require('../../models/inboxModel')
const mongoose = require('mongoose')


const getMessages = async (req, res, next) => {
    try {
        const messages = await inboxModel.find().sort({createdAt:-1})

        return res.json({
            success: true,
            messages: messages
        })
    } catch (error) {
        return next(error)
    }
}



const deleteMessage = async (req,res,next) => {
    try{
        const {id} = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const message = await inboxModel.findById(id)
        //check if message exists
        if (!message || !Object.keys(message).length) {
            throw { status: 404 }
        }

        //deleting record from db
        await inboxModel.findByIdAndDelete(id)
        
        return res.json({
            success: true,
            deletedId:id
        })
    }catch(error){
        return next(error)
    }
}

// set message as viewed

const setMessageViewed = async (req, res, next) => {
    try {
        const { id } = req.params

        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const message = await inboxModel.findById(id)
        //check if message exists
        if (!message) {
            throw { status: 404 }
        }
        // check if the message is not viewed
        if (message.isOpened) {
            return res.status(200)
        }

        //setting the message as viewed
        const viewedMessage = await inboxModel.findByIdAndUpdate(id,{isOpened:true},{new:true,runValidators:true})

        //confirming
        if(!viewedMessage.isOpened){
            throw {status:500}
        }

        return res.json({
            success:true,
            _id:id,
            updatedAt:viewedMessage.updatedAt
        })
    }catch(error){
        return next(error)
    }

}


module.exports = {
    getMessages,
    deleteMessage,
    setMessageViewed
}