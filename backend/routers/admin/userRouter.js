const userRouter = require('express').Router()
const {deleteUser,getUsers} = require('../../controllers/admin/userController')

// get users metadata sub-route
userRouter.get('/',getUsers)

// delete user

userRouter.delete('/:id',deleteUser)

module.exports = userRouter