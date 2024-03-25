import jwt from "jsonwebtoken"
import config from "../config/config.js"
import userService from "../service/index.service.js"
export default async function (req, res, next) {
    let user = await userService.getByEmail(req.mail)
    let token = jwt.sign( {email: req.body.email, role: req.user.role, user: req.user.username, avatar: req.user.avatar}, config.jwt_secret, { expiresIn: 60*60})
    req.token = token
    next()
}