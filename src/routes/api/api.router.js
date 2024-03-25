import Router from "express"
import auth from "./auth.router.js"

const router = Router()

router.use("/", auth)

export default router