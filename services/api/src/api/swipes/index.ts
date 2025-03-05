import express from "express"
import { Swipe } from "../../mongo/SwipeRepository"

const router = express.Router()

router.get("/stats", async (req, res) => {
	const user_id = req.headers["uid"]

	if (typeof user_id !== "string") {
		res.status(400)
		return
	}

	const s: Pick<Swipe, "user_id"> = { user_id }

	const likes = await req.swipeRepo.countLike(s)
	const dislikes = await req.swipeRepo.countDislike(s)

	res.status(200).json({ dislikes, likes })
})

router.post("/", async (req, res) => {
	const user_id = req.headers["uid"]

	if (typeof user_id !== "string") {
		res.status(400)
		return
	}

	const s: Swipe = {
		user_id,
		liked: req.body.liked,
		target_id: req.body.uid,
	}

	req.swipeChannel.publish(JSON.stringify(s))

	res.status(200).json("success")
})

export = router
