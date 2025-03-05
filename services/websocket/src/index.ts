import WebSocket from "ws"
import dotenv from "dotenv"

dotenv.config()

const PORT = 3001
const wss = new WebSocket.Server({ port: PORT })

wss.on("connection", (ws) => {
	console.log("Client connected")

	ws.on("message", (message) => {
		console.log(`Received: ${message}`)
	})

	ws.on("close", () => {
		console.log("Client disconnected")
	})
})

console.log(`WebSocket server running on port ${PORT}`)

process.on("SIGTERM", async () => {
	console.log("got a SIGTERM signal")
	wss.close()
})
process.on("SIGINT", async () => {
	console.log("got a SIGINT signal")
	wss.close()
})
