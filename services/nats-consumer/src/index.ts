import { connect, StringCodec, NatsConnection } from "nats"

const NATS_URL = "nats://nats:4222"
const sc = StringCodec()

let nc: NatsConnection

async function startNats() {
	nc = await connect({ servers: NATS_URL })
	console.log(`Connected to NATS at ${NATS_URL}`)

	const sub = nc.subscribe("swipes")

	for await (const msg of sub) {
		console.log(`Received message: ${sc.decode(msg.data)}`)
	}

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
