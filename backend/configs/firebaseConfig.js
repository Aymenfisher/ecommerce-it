require('dotenv').config()
const { initializeApp } = require("firebase/app");
const { getStorage } = require('firebase/storage');

// config object
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
//initialize app
const app = initializeApp(firebaseConfig);
const imagesDb = getStorage(app) // bucket


//export functions
module.exports = {
    imagesDb
}

