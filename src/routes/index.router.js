import { Router } from "express";

import api_router from "./api/api.router.js"
import views_router from "./views/views.router.js"

const router = Router()

router.use("/", views_router)
router.use("/api", api_router)
export default router