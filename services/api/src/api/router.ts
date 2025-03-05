import express from "express"

import swipesRouter from "./swipes/index"
import GDPRRouter from "./gdpr/index"

const router = express.Router()

router.use("/swipes", swipesRouter)
router.use("/gdpr", GDPRRouter)

export = router
