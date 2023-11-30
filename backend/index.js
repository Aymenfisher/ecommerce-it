require('dotenv').config()
/* imports */
const express = require('express')
const cors = require('cors')
const adminRouter = require('./routers/admin/adminRouter')
const storeRouter = require('./routers/store/storeRouter')
const mongoose = require('mongoose')

//initialize
const app = express()


//middlewares
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }))
app.use(express.json())

/*routers:
    store router
    admin router
*/
app.use('/store', storeRouter)
app.use('/admin', adminRouter)

//catch invalid paths
app.use('*', (req, res, next) => {
    throw { status: 404 }
})

// error handler
app.use((err, req, res, next) => {
    switch (err.status) {
        case 400:
            return res.status(400).json({
                status: 400,
                message: 'Bad Request'
            });
        case 401:
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            });
        case 403:
            return res.status(403).json({
                status: 403,
                message: 'Forbidden'
            });
        case 404:
            return res.status(404).json({
                status: 404,
                message: 'Resource Not found'
            });
        case 409:
            return res.status(409).json({
                status: 409,
                message: 'Already exists'
            });
        case 422:
            return res.status(422).json({
                status: 422,
                message: 'Unprocessable'
            });
        default:
            return res.status(500).json({
                status: 500,
                message: 'Server Error'
            });
    }
})


// connect to db and start server 

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // start server after successfull db connection
        app.listen(process.env.PORT, '192.168.1.4', () => {
            console.log('Server is Running')
        })
    })
    .catch(e => console.log('Could not start server'))