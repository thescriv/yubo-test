import { SwipeRepository } from "../mongo/SwipeRepository"
import { NatsRepository } from "../nats/NatsRepository"

declare global {
	namespace Express {
		interface Request {
			swipeRepo: SwipeRepository
			swipeChannel: NatsRepository
		}
	}
}
