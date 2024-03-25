import userService from "../service/index.service.js";
import forgotMiddleware from "../middlewares/forgotMiddleware.js";
import sendMail from "../config/nodemailer.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken"

class UserController {
    async login(req, res) {
        try {
            return res.cookie('token', req.token, { maxAge: 60 * 60 * 24 * 7 })
                .json({ success: true, status: 200 })
        }
        catch (e) {
            console.log(e)
        }
    }
    async logout(req, res) {
        try {
            res.clearCookie("token",)
            return res.json({success: true, status: 200})
        }
        catch (e) {
            console.log(e)
        }
    }
    async forgot(req, res) {
        try {
            let user = await userService.getByEmail(req.body.email)
            delete user.password
            if (user) {
                let token = await forgotMiddleware(req.body.email)
                if (token) {
                    let link = `http://localhost:8080/reset-password/${token}`
                    let message = `Reset your password here, the link expires in 1 hour: ${link}`;
                    await sendMail(req.body.mail, message);
                    return res.json({ success: true, message: "Revisa tu correo" })
                }
                else {
                    return res.json({ success: true })
                }
            }
            else {
                return res.json({ success: true })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async reset(req, res) {
        try {
            if (req.cookies.resetpass) {
                let verificated = jwt.verify(req.cookies.resetpass, config.jwt_secret)
                if (verificated) {
                    await userService.update(verificated.email, req.body.password)
                    res.clearCookie("resetpass")
                    return res.json({success: true, message: "Contraseña cambiada éxitosamente"})
                }

            }
            else {
                return res.json({success: false, message: "Error cambiando la contraseña"})
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async getUsers(req, res) {
        try {
            return await userService.getUsers()
        }
        catch (e) {
            console.log(e)
        }
    }
    async getUser(email) {
        try {
            return await userService.getByEmail(email)
        }
        catch (e) {
            console.log(e)
        }
    }
    async createUser(req, res) {
        try {
            return res.status(200).json({ success: true, })
        }
        catch (e) {
            console.log(e)
        }
    }
}

const { getUsers, getUser, createUser, login, logout, forgot, reset } = new UserController()
export { getUsers, getUser, createUser, login, logout, forgot, reset }