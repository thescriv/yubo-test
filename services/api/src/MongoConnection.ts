import { MongoClient, Db } from "mongodb"

export class MongoConnection {
	private static instance: Db | null = null
	private static client: MongoClient | null = null

	static async connect(uri: string, dbName: string): Promise<Db> {
		if (this.instance) {
			return this.instance
		}

		this.client = new MongoClient(uri)

		await this.client.connect()
		this.instance = this.client.db(dbName)

		console.log("Connected to MongoDB")

		return this.instance
	}

	static async close(): Promise<void> {
		if (!this.client) {
			return
		}

		await this.client.close()
		this.client = null
		this.instance = null

		console.log("Disconnected from MongoDB")
	}
}
