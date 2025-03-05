import { Payload } from "nats";

export interface INatsRepository {
	publish(p: Payload): boolean
}
