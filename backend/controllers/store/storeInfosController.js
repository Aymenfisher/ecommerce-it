const storeInfosModel = require('../../models/storeInfosModel')

// get store infos
const getStoreInfos = async (req,res,next) =>{
    try{
        const storeInfos = await storeInfosModel.findOne({},{_id:0}) //there is only one record that holds the store infos
        return res.json(storeInfos)
    }catch(err){
        return next(err)
    }
}

module.exports = {
    getStoreInfos
}