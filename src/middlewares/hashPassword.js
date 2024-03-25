import { hashSync, genSaltSync, genSalt } from "bcrypt"

export default function hashPass(req, res, next) {
    const password = req.body.password
    const hashP = hashSync(password, genSaltSync())
    req.body.password = hashP
    return next()
}