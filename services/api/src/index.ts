import express, { Request } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { Server } from "http"
import { MongoConnection } from "./mongo/MongoConnection"
import { Swipe, SwipeRepository } from "./mongo/SwipeRepository"

import { connect, StringCodec, NatsConnection, Payload } from "nats"
import { NatsConnec } from "./nats/NatsConnection"
import { NatsRepository } from "./nats/NatsRepository"

import router from "./api/router"

dotenv.config()

let server: Server

const app = express()

async function main() {
	app.use(express.json())
	app.use(cors())

	const PORT = 3000

	const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"

	const db = await MongoConnection.connect(mongoUri, "yubo")
	const swipeRepo = new SwipeRepository(db)

	const nc = await NatsConnec.connect()
	const swipeChannel = new NatsRepository("swipes", nc)

	app.use("/", (req: Request, _, next) => {
		req.swipeRepo = swipeRepo
		req.swipeChannel = swipeChannel
		next()
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
