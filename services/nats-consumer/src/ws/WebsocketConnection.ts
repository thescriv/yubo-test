import WebSocket from "ws"

export class WebsocketConnection {
	private static ws: WebSocket | null = null

	static connect(adress: string): WebSocket {
		this.ws = new WebSocket(adress)

		this.ws.on("close", () => {
			if (!this.ws) {
				return
			}
			console.log("Disconnected from websocket")
			this.ws?.close()
			this.ws = null
			return
		})

        console.log("Connected to the websocket")

		return this.ws
	}

	static close(): void {
		if (!this.ws) {
			return
		}

		this.ws.close()
	}
}
