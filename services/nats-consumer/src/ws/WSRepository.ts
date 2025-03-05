import WebSocket from "ws"

export class WSRepository {
	private ws: WebSocket

	constructor(ws: WebSocket) {
		this.ws = ws
	}

	publish(msg: string) {
		this.ws.send(msg)
	}
}
