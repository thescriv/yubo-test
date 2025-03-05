import { WebSocket } from "ws"
import { IWebSocketRepository } from "./IWebsockerRepository"
import { WSRepository } from "./WSRepository"

export class SwipeWs {
	private repository: IWebSocketRepository

	constructor(ws: WebSocket) {
		this.repository = new WSRepository(ws)
	}

	publishLike(uid: string) {
		const msg = JSON.stringify({
			type: "swipe-liked",
			uid,
		})

		this.repository.publish(msg)
	}

	publishDislike(uid: string) {
		const msg = JSON.stringify({
			type: "swipe-disliked",
			uid,
		})

		this.repository.publish(msg)
	}
}
