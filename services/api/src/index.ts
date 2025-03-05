import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = 3000

app.get("/swipes/stats", (req, res) => {
	res.status(200).json({ dislikes: 0, likes: 0 })
})

app.post("/swipes", (req, res) => {
	res.status(204)
})

app.post("/gdpr/erase-all", (req, res) => {
	res.status(204)
})

const server = app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`)
})

process.on("SIGTERM", async () => {
	console.log("got a SIGTERM signal")
	server.close()
})
process.on("SIGINT", async () => {
	console.log("got a SIGINT signal")
	server.close()
})
