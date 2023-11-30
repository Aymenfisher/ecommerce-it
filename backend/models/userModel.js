const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isStrongPassword} = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        maxLength:100,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// static methods: login , signup 

userSchema.statics.signup = async function(username,password,firstName,lastName,role){
    // make sure all infos are included
    if(!username || !password || !firstName || !lastName || !role){
        const error = Error('All fields must be filled')
        error.name = 'customValidation'
        throw error
    }

    if(!['owner','seller'].includes(role)){
        const error = Error('Invalid role')
        error.name = 'customValidation'
        throw error
    }

    //make sure username doesnt exists:
    const userExists = await this.findOne({username:username.toLowerCase()})
    if(userExists){
        const error = Error('Username already exists !')
        error.name = 'customValidation'
        throw error
    }

    // make sure password is strong
    if(!isStrongPassword(password)){
        const error=  Error('Password is not strong enough.')
        error.name = 'customValidation'
        throw error
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password,10)

    // create the new user record then return it:
    const user = await this.create({
        firstName,lastName,role,
        username:username.toLowerCase(),
        password:hashedPassword
    })

    return user
}

userSchema.statics.login = async function(username,password){
    // make sure all username and password are provided
    if(!username || !password){
        const error = Error('All fields must be filled !')
        error.name = 'customValidation'
        throw error
    }

    // make sure username exists
    const user = await this.findOne({username:username.toLowerCase()})
    if(!user){
        const error = Error('Username / Password Combination does not match.')
        error.name = 'customValidation'
        throw error
    }
    // check for password validity:
    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch){
        const error = Error('Username / Password Combination does not match.')
        error.name = 'customValidation'
        throw error
    }
    return user
}

// User model

const userModel = mongoose.model('User',userSchema)

module.exports = userModel