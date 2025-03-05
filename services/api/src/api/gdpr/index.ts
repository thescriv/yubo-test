import express from "express"
import { Swipe } from "../../mongo/SwipeRepository"

const router = express.Router()

router.post("/erase-all", async (req, res) => {
	const user_id = req.headers["uid"]

	if (typeof user_id !== "string") {
		res.status(400)
		return
	}

	const s: Pick<Swipe, "user_id"> = { user_id }

	await req.swipeRepo.delete(s)

	res.status(204)
})

export = router
