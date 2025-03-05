import { connect, StringCodec, NatsConnection } from "nats"
import dotenv from "dotenv"
import { MongoConnection } from "./mongo/MongoConnection"
import { Swipe, SwipeRepository } from "./mongo/SwipeRepository"
import { WebsocketConnection } from "./ws/WebsocketConnection"
import { SwipeWs } from "./ws/SwipeRepository"

dotenv.config()

const NATS_URL = "nats://nats:4222"
const sc = StringCodec()

let nc: NatsConnection

async function processMessage(
	nc: NatsConnection,
	swipeRepo: SwipeRepository,
	swipeWs: SwipeWs
) {
	const sub = nc.subscribe("swipes")

	for await (const msg of sub) {
		const data = sc.decode(msg.data)

		const s: Swipe = JSON.parse(data)

		await swipeRepo.createSwipe(s)

		if (s.liked) {
			swipeWs.publishLike(s.target_id)
		} else {
			swipeWs.publishDislike(s.target_id)
		}
	}
}

async function startNats() {
	const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"

	const db = await MongoConnection.connect(mongoUri, "yubo")
	const swipeRepo = new SwipeRepository(db)

	const websocketUrl =
		process.env.WEBSOCKET_URL || "ws://localhost:3002/websocket"

	const ws = WebsocketConnection.connect(websocketUrl)
	const swipeWs = new SwipeWs(ws)

	nc = await connect({ servers: NATS_URL })
	console.log(`Connected to NATS at ${NATS_URL}`)

	processMessage(nc, swipeRepo, swipeWs)

	console.log('Listening for messages on "swipes"')
}

async function stopNats() {
	const done = nc.closed()

	await nc.close()
	const err = await done
	if (err) {
		console.log(`error closing:`, err)
	}
}

startNats()

process.on("SIGTERM", async () => {
	console.log("got a SIGTERM signal")
	await stopNats()
})
process.on("SIGINT", async () => {
	console.log("got a SIGINT signal")
	await stopNats()
})
