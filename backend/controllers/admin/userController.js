const User = require('../../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

/* auth controllers */
const createToken = (payload, keepSigned) => { // payload must be an object
    return jwt.sign(payload, process.env.SECRET, { expiresIn: keepSigned ? '30d' : '3d' })
}

const signup = async (req, res) => {
    const body = req.body
    try {
        // create the new user
        const newUser = await User.signup(body.username, body.password, body.firstName, body.lastName, body.role)

        return res.status(201).json({
            username: newUser.username,
            message: 'user created with success'
        })
    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { // mongoose validation error
            return res.status(400).json('Bad Request')
        }
        if (error.name == 'customValidation') { // my custom validation errors to display in frontend
            return res.status(400).json({
                message: error.message
            })
        }
        return res.status(422).json({ message: 'An unexpected error occured, please verify your informations then try again.' })
    }
}

//login

const login = async (req, res) => {
    const body = req.body
    try {
        // getting the requested user 
        const user = await User.login(body.username, body.password)
        //generating token:
        const token = createToken({ role: user.role, username: user.username,firstName:user.firstName,lastName:user.lastName }, body.keepSigned)
        // return token
        return res
            .status(200)
            .json({
                message: 'Logged in successfully!',
                token:token
            });

    } catch (error) {
        if (['ValidationError', 'CastError', 'StrictModeError'].includes(error.name)) { // mongoose validation error
            return res.status(400).json('Bad Request')
        }
        if (error.name == 'customValidation') { // my custom validation errors to display in frontend
            return res.status(400).json({
                message: error.message
            })
        }
        // handle unexpected errors with a defined message
        return res.status(422).json({ message: 'An unexpected error occured, please verify your informations then try again.' })
    }
}


/* user actions controllers */
// 1- get all users metadata , 2- delete user

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { username: 1, firstName: 1, lastName: 1, role: 1 })
        return res.json(users)
    } catch (error) {
        return next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        // check id validity
        if (!mongoose.isValidObjectId(id)) {
            throw { status: 400 }
        }

        const user = await User.findById(id)
        //check if user exists
        if (!user || !Object.keys(user).length) {
            throw { status: 404 }
        }

        if (user.username == 'aymenboudabia@gmail.com') { // this account cant be deleted
            throw { status: 422 }
        }
        //deleting record from db
        const deletedUser = await User.findByIdAndDelete(id)

        return res.json({
            success: true,
            deletedId: deletedUser._id
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    signup,
    login,
    getUsers,
    deleteUser
}