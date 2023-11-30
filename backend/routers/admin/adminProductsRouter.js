const adminProductsRouter = require('express').Router()
const { getAdminProduct, getAdminProducts, updateProduct, deleteProduct, createProduct,uploadImages,rollbackUploadImages, deleteExistingImagesAndSaveProduct} = require('../../controllers/admin/adminProductsControllers')
const multer = require('multer')

// multer config for file upload (multipart): using memory storage
const multerStorage = multer.memoryStorage()
const upload = multer({
    storage: multerStorage
})


// get all products for admin

adminProductsRouter.get('/', getAdminProducts)

// get a single product for admin

adminProductsRouter.get('/:id', getAdminProduct)

// Create a product

adminProductsRouter.post('/',upload.array('images'),uploadImages,createProduct,rollbackUploadImages) // rollbackUploadImages executed if images are uploaded but an error occurs

// Delete a product

adminProductsRouter.delete('/:id', deleteProduct)

// Update a product

adminProductsRouter.patch('/:id',upload.array('images'), uploadImages,updateProduct,deleteExistingImagesAndSaveProduct)

module.exports = adminProductsRouter