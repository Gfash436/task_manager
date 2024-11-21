const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://myadmin:yFPww4kwhJhA3NF6@cluster0.m9drg.mongodb.net/taskmanager");
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Database connection failed" + error.message);
    }
}

module.exports = connectDb;