import WebSocket from "ws"

export class WebsocketConnection {
	private static ws: WebSocket | null = null

	static connect(adress: string): WebSocket {
		this.ws = new WebSocket(adress)

		this.ws.on("close", () => {
			if (!this.ws) {
				return
			}
			console.log("Connexion au websocket close")
			this.ws?.close()
			this.ws = null
			return
		})

        console.log("connecté au websocket !")

		return this.ws
	}

	static close(): void {
		if (!this.ws) {
			return
		}

		this.ws.close()
	}
}
