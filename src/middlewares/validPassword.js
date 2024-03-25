import { compareSync } from "bcrypt"
import userService from "../service/index.service.js"

export default async function isValidPassword(req, res, next) {
    let user = await userService.getByEmail(req.body.email)
    if(user) {
    let validate = compareSync(req.body.password, user.password)
    if(validate) {
        next()
    }
    else {
        return res.json({success: false, message: "Credenciales incorrectas"})
    }
    }

}