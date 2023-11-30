const storeInfosModel = require('../../models/storeInfosModel')

//modify store infos

const modifyStoreInfos = async (req,res,next) => {
    try{
        const data = req.body
        // handle empty body
        if(!Object.keys(data).length){
            throw {status:400}
        }

        await storeInfosModel.findOneAndUpdate({},data)
        return res.json({
            success:true
        })

    }catch(error){
        if(['ValidationError','CastError','StrictModeError'].includes(error.name)){ // possible mongoose errors
            error.status = 400
            return next(error)
        }
        return next(error)
    }
}

module.exports={
    modifyStoreInfos
}