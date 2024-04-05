import { Router } from "express"
import passport from "../../config/passport.js"
import passport_call from "../../middlewares/passport.js"
import isLoged from "../../middlewares/isLoged.js"
import sendMail from "../../config/nodemailer.js"
import config from "../../config/config.js"
import userService from "../../service/index.service.js"
import jwt from "jsonwebtoken"
import blackjackGameInstance from "../../game/game.js"

const router = Router()

router.get("/login", isLoged, async (req, res) =>{
    return res.render("login")
})
router.get("/register", isLoged, async (req, res) =>{
    return res.render("register")
})
router.get("/", passport_call("jwt"), async (req, res) => {
    const secretKey = config.jwt_secret
    let verify = jwt.verify(req.cookies.token, secretKey)
    let email = JSON.stringify(verify.email)
    let user = await userService.getByEmailSafe(verify.email)
    return res.render("menu", {username: verify.user, email: email, avatar: verify.avatar, chips: user.chips})
})
router.get("/forgot", isLoged, async(req, res) => {
    return res.render("forgot")
})
router.get("/reset-password/:token", isLoged, async(req, res) => {
    if(req.cookies.resetpass && req.cookies.resetpass !== "sweetalert2.min.css") {
        return res.render("resetpass")
    }
    else if (!req.cookies.resetpass) {
        res.clearCookie("resetpass")
        let token = req.params.token
        res.cookie("resetpass", token, { maxAge: 30000, httpOnly: true })
        return res.render("resetpass")
    }
    else {
        return res.redirect("/")
    }
})

router.get("/profile/:user", passport_call("jwt"), async(req, res) => {
    let user = req.params.user
    let userFinded = await userService.findOne({username: user})
    userFinded.password = "null"
    return res.render("profile", { avatar: userFinded.avatar, username: userFinded.username, age: userFinded.age, email: userFinded.email, coins: userFinded.chips, created_in: userFinded.created_in  })
})

router.get("/estadisticas", passport_call("jwt"), async(req, res) => {
    let users = await userService.getUsers()
    users.sort((a, b) => b.chips - a.chips)
    let topUsers = users.slice(0, 10)
    topUsers.forEach((user, index) => {
        user.rank = index + 1
    })
    return res.render("ranking", { users: topUsers})
})

router.get("/blackjack", passport_call("jwt"), async(req, res) => {
    const secretKey = config.jwt_secret
    let verify = jwt.verify(req.cookies.token, secretKey)
    let user = await userService.findOne({username: verify.user})
    return res.render("blackjack", { username: verify.user, avatar: verify.avatar, chips: user.chips})
})



export default router