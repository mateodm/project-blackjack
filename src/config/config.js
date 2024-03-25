import mongoose from "mongoose"
import MongoSingleton from "./singleton.js"
import dotenv from 'dotenv';
dotenv.config();
export default {
    mongoUrl: process.env.MONGOURL,
    port: process.env.PORT,
    googleID: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    secretKey: process.env.SECRET_KEY,
    gmail_username: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    jwt_secret: process.env.JWT_SECRET,
    connectMDB: () => MongoSingleton.getInstance()
}