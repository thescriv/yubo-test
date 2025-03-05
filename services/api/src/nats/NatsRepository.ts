import { NatsConnection, Payload } from "nats"

export class NatsRepository {
	private channel: string
	private nc: NatsConnection

	constructor(channelName: string, nc: NatsConnection) {
		this.channel = channelName
		this.nc = nc
	}

	publish(p: Payload): void {
		this.nc.publish(this.channel, p)
	}
}
