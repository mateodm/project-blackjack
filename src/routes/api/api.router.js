import Router from "express"
import auth from "./auth.router.js"
import { getFreeCoins } from "../../controllers/user.controller.js"

const router = Router()

router.use("/", auth)
router.post("/get-coins", getFreeCoins)

export default router