const inboxModel = require('../../models/inboxModel')

const postMesssage = async (req, res, next) => {
    try {
        const body = req.body
        const newMessage = new inboxModel(body)
        await newMessage.save()
        return res.json({
            success:true
        })
    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { // possible mongoose errors
            error.status = 400
            return next(error)
        }
        return next(error)
    }
}

module.exports = {
    postMesssage
}