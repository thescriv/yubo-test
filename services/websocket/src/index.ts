import WebSocket from "ws"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || "3001"
const wss = new WebSocket.Server({ port: Number(PORT) })

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
