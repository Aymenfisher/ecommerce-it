const authRouter = require('express').Router()
const requireAuth = require('../../middleware/requireAuth')
const {signup,login} = require('../../controllers/admin/userController')

//signup : only owner can add admins
authRouter.post('/signup',requireAuth(['owner']),signup)

//login
authRouter.post('/login',login)

// check for authentication : return status code: (200 , 401 , or 403)

authRouter.get('/check',requireAuth(),(req,res) =>{return res.status(200).json({message:'Access granted'})})

module.exports = authRouter
