import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { Server } from "http"
import { MongoConnection } from "./mongo/MongoConnection"
import { Swipe, SwipeRepository } from "./mongo/SwipeRepository"

import { connect, StringCodec, NatsConnection, Payload } from "nats"
import { NatsConnec } from "./nats/NatsConnection"
import { NatsRepository } from "./nats/NatsRepository"

const NATS_URL = "nats://nats:4222"
const sc = StringCodec()

let nc: NatsConnection

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

	const nc = await NatsConnec.connect()
	const swipeChannel = new NatsRepository("swipes", nc)

	const router = express.Router()

	app.use("/", (req, res, next) => {
		console.log("got a request")
		next()
	})

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	router.get("/swipes/stats", async (req, res) => {
		const user_id = req.headers["uid"]

		if (typeof user_id !== "string") {
			res.status(400)
			return
		}

		const s: Pick<Swipe, "user_id"> = { user_id }

		const likes = await swipeRepo.countLike(s)
		const dislikes = await swipeRepo.countDislike(s)

		console.log(likes)
		console.log(dislikes)

		res.status(200).json({ dislikes, likes })
	})

	router.post("/swipes", async (req, res) => {
		const user_id = req.headers["uid"]

		console.log(user_id)

		if (typeof user_id !== "string") {
			res.status(400)
			return
		}

		console.log(req.body)

		const s: Swipe = {
			user_id,
			liked: req.body.liked,
			target_id: req.body.uid,
		}

		console.log(s)

		swipeChannel.publish(JSON.stringify(s))

		console.log("send message to nats")

		res.status(200).json("success")
	})

	router.post("/gdpr/erase-all", async (req, res) => {
		const user_id = req.headers["uid"]

		if (typeof user_id !== "string") {
			res.status(400)
			return
		}

		const s: Pick<Swipe, "user_id"> = { user_id }

		await swipeRepo.delete(s)

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
