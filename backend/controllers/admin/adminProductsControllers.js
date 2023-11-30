//imports
const Products = require('../../models/productsModel');
const mongoose = require('mongoose');
const { ref, getDownloadURL, deleteObject, uploadBytes } = require('firebase/storage');
const { imagesDb } = require('../../configs/firebaseConfig')
const { v4: uuidv4 } = require('uuid')

// get all products
const getAdminProducts = async (req, res, next) => {
    try {
        const products = await Products.find()
        return res.json(products)
    } catch (error) {
        return next(error)
    }
}

//get a single product 
const getAdminProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const product = await Products.findById(id)
        //check if product exists
        if (!product || !Object.keys(product).length) {
            throw { status: 404 }
        }

        return res.json(product)
    } catch (error) {
        return next(error)
    }
}

// create new product

const createProduct = async (req, res, next) => {
    try {
        const jsonData = JSON.parse(req.body.jsonData)
        const images = req.images
        // contructing product object : 
        const productToSave = {
            ...jsonData,
            discountedPrice:jsonData.price - jsonData.discountPrice,
            images: images,
            mainImage: jsonData.mainImage == -1 ? '' : images[jsonData.mainImage]
        }
        const newProduct = await Products.create(productToSave)

        return res.status(201).json({
            success: true,
            createdId: newProduct._id
        })
    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { //validation error
            error.status = 400
        }
        // pass the error to rollbackUpload images middleware
        req.errorCreateProduct = error
        return next()
    }
}

// Detele product

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const product = await Products.findById(id)
        //check if product exists
        if (!product || !Object.keys(product).length) {
            throw { status: 404 }
        }
        // delete product images from storage
        if (product.images.length) {
            await Promise.all(
                product.images.map(async (url) => {
                    try{
                        await deleteObject(ref(imagesDb, url))
                    }catch(error){
                        if(error.code != 'storage/object-not-found'){
                            throw error
                        }
                    }
                })
            )
        }
        //deleting record from db
        await Products.deleteOne({ _id: id })

        return res.json({
            success: true,
            deletedId: id
        })
    } catch (error) {
        return next(error)
    }
}

// update product
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const jsonData = JSON.parse(req.body.jsonData)
        const uploadedImages = req.images // array of uploaded images urls (uploaded by first middleware)

        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        //query for product from db :
        const product = await Products.findById(id)
        //check if product exists
        if (!product) {
            throw { status: 404 }
        }

        // cosntruct new product object :
        const newProduct = {
            ...jsonData
        }


        /* construct images to delete array : will be passed to next middleware */
        const imagesToDelete = jsonData.hasOwnProperty('images') ? product.images.filter(image => !jsonData.images.includes(image)) : []
        req.imagesToDelete = imagesToDelete // passed to next middleware to delete them form storage



        /* handle images and main image if modified */
        // 1- handle images : push new uploaded images to the existing ones
        jsonData.hasOwnProperty('images') && (newProduct.images.push(...uploadedImages))
        // 2- handle main image if modified
        if (jsonData.hasOwnProperty('mainImage')) {
            if(jsonData.hasOwnProperty('images')){
                jsonData.mainImage == -1 ? newProduct.mainImage = '' : newProduct.mainImage = [...jsonData.images, ...uploadedImages].at(jsonData.mainImage)
            }else{
                jsonData.mainImage == -1 ? newProduct.mainImage = '' : newProduct.mainImage = product.images.at(jsonData.mainImage)
            }
            
        }


        req.product = newProduct

        return next()
    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { // possible mongoose errors
            error.status = 400
            return next(error)
        }
        return next(error)
    }
}

/* ---- middlewares -----*/

const uploadImages = async (req, res, next) => {
    /* 
        upload new images then return their urls in array
    */
    try {
        const imagesData = req.files // image files array
        // handle no images case
        if (!imagesData.length) {
            req.images = []
            return next()
        }
        // upload new images to storage
        const uploadedImages = await Promise.all(
            imagesData.map(async image => await uploadBytes(ref(imagesDb, `products/${uuidv4()}`), image.buffer,{contentType:image.mimetype})
            )
        )
        // get download urls
        const uploadedImagesURLS = await Promise.all(
            uploadedImages.map(async uploadedImage => await getDownloadURL(uploadedImage.ref)
            )
        )

        req.images = uploadedImagesURLS
        return next()

    } catch (e) {
        return next(e)
    }
}

const deleteExistingImagesAndSaveProduct = async (req, res, next) => {
    /* 
        deletes existing images of a product then save the product to the database
        this middleware will be executed only if there is images to delete
    
    */
    try {
        const productData = req.product // product to save object
        const imagesToDelete = req.imagesToDelete // array of urls

        await Promise.all(
            imagesToDelete.map(async (url) => {
                try{
                    await deleteObject(ref(imagesDb, url))
                }catch(error){
                    if(error.code != 'storage/object-not-found'){
                        throw error
                    }
                }
            })
        )
        //saving product :
        await Products.findByIdAndUpdate(req.params.id, productData,{runValidators:true})

        return res.json({
            success: true,
            updatedId: req.params.id
        })
    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { // possible mongoose errors
            error.status = 400
            return next(error)
        }
        return next(error)
    }
}

const rollbackUploadImages = async (req, res, next) => {
    /* 
    only executes if an error occured during creating a new product
    delete uploaded images in case of failure of creating a product
    */
    try {
        const imagesToDelete = req.images
        if (!imagesToDelete.length) {
            throw req.errorCreateProduct
        }
        await Promise.all(
            imagesToDelete.map(async (url) => {
                await deleteObject(ref(imagesDb, url))
            })
        )
        // after deletion, we pass the error happened in the create product middlware to the global error handler
        throw req.errorCreateProduct
    } catch (error) {
        return next(error)
    }

}


module.exports = {
    getAdminProducts,
    getAdminProduct,
    updateProduct,
    deleteProduct,
    createProduct,
    uploadImages,
    deleteExistingImagesAndSaveProduct,
    rollbackUploadImages
}
