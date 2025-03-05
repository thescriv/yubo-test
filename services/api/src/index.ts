import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { Server } from "http"
import { MongoConnection } from "./MongoConnection"
import { Swipe, SwipeRepository } from "./SwipeRepository"

dotenv.config()

let server: Server

const app = express()

async function main() {
	app.use(express.json())
	app.use(cors())

	const PORT = 3000

	const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"

	console.log(mongoUri)

	const db = await MongoConnection.connect(mongoUri, "yubo")

	const swipeRepo = new SwipeRepository(db)

	const router = express.Router()

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	router.get("/swipes/stats", (req, res) => {
		res.status(200).json({ dislikes: 10, likes: 10 })
	})

	router.post("/swipes", (req, res) => {
		const s: Swipe = {
			type: req.body.liked ? "swipe-liked" : "swipe-disliked",
			uid: "1",
		}

		swipeRepo.createSwipe(s)

		console.log("inserted a new swipe !")

		res.status(204)
	})

	router.post("/gdpr/erase-all", (req, res) => {
		res.status(204)
	})

	app.use("/api", router)

	server = app.listen(PORT, () => {
		console.log(`API running on port ${PORT}`)
	})
}

main()

process.on("SIGTERM", async () => {
	console.log("got a SIGTERM signal")

	await Promise.all([MongoConnection.close(), server.close()])
})
process.on("SIGINT", async () => {
	console.log("got a SIGINT signal")

	await Promise.all([MongoConnection.close(), server.close()])
})
