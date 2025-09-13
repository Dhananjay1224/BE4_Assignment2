const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB;

const initializeDB = async () => {
    await mongoose.connect(MONGO_URI).then(() => {
        console.log("Connected to DB");
    }).catch((error) => {
        console.log("Error in connecting to DB", error);
    });
};

module.exports = initializeDB;