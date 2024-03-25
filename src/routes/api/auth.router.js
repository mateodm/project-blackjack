import Router from "express"
import { getUser, getUsers, createUser, login, logout, forgot, reset} from "../../controllers/user.controller.js"
import checkRegister from "../../middlewares/registerCheck.js"
import hashPass from "../../middlewares/hashPassword.js"
import isLoged from "../../middlewares/isLoged.js"
import passport_call from "../../middlewares/passport.js";
import passport from "passport";
import isValidPassword from "../../middlewares/validPassword.js";
import jwtCreator from "../../middlewares/jwtCreator.js";

const router = Router()

router.post("/register", isLoged, checkRegister, hashPass, passport.authenticate("register", { session: false, failureRedirect: "/api/auth/failed-register" }), createUser)

router.get("/auth/google", passport.authenticate("google", { scope: ['profile', 'email'], }), jwtCreator, login)


router.get("/auth/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), (req, res) => {
    let token = req.user
    return res.cookie('token', token.token, { maxAge: 60 * 60 * 1000 }).redirect("/")
})


router.get("/failed-register", (req, res) => {
    res.status(401).json({ success: false, message: "Error to register" })
})

router.post("/signin", isLoged, passport.authenticate("signin", { session: false}), isValidPassword, jwtCreator, login, async (req, res) => {
    return res.json({ success: true })
})

router.post("/logout", logout)
router.get("/failed-signin", (req, res) => {
    res.status(401).json({ success: false, message: "Error to login" })
})

router.post("/forgot-password", forgot)

router.post("/reset-password", hashPass, reset)

router.get("/users", getUsers)
router.get("/users", getUser)

export default router