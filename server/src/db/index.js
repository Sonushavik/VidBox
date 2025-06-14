require('dotenv').config();
const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI

const connectDB =async() => {
        console.log(MONGO_URI);
        try {
                const connectionInstance = await mongoose.connect(MONGO_URI)
                console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        } catch (error) {
                 console.log("MONGODB connection FAILED ", error);
                process.exit(1)
        }
}

module.exports = connectDB;