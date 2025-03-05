import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/swipes/stats", (req, res) => {
	res.status(200).json({ dislikes: 0, likes: 0 })
})

app.post("/swipes", (req, res) => {
	res.status(204)
})

app.post("/gdpr/erase-all", (req, res) => {
	res.status(204)
})

app.listen(PORT, () => {
	console.log(`API running on port ${PORT}`)
})
