import { connect, NatsConnection } from "nats"

export class NatsConnec {
	private static nc: NatsConnection | null = null

	static async connect(): Promise<NatsConnection> {
		if (this.nc) {
			return this.nc
		}

		this.nc = await connect({ servers: process.env.NATS_URL })

		console.log("Connected to Nats")

		return this.nc
	}

	static async close(): Promise<void> {
		if (!this.nc) {
			return
		}

		await this.nc.close()

		console.log("Disconnected from Nats")
	}
}
