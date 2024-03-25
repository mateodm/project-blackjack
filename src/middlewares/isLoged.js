import jwt from "jsonwebtoken"
import config from "../config/config.js"
export default async function (req, res, next) {
    if (req.cookies.token) {
        return res.status(401).redirect("/")
    }
    else {
        next()
    }
}