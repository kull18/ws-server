import { WebSocket } from "ws"
import { Chanel } from "./Channel"
import { Hub } from "./Hub"
import { Message } from "./message"


export class Client {
    readonly id: string
    readonly chanel: Chanel<string>
    readonly conn: WebSocket
    readonly hub: Hub
    readonly closed: boolean
    
    constructor(id: string, conn: WebSocket, hub: Hub, closed: boolean) {
        this.id = id
        this.chanel = new Chanel<string>()
        this.conn = conn, 
        this.hub = hub,
        this.closed = closed
    }

    send(message: Message) {
        if(this.conn.readyState === WebSocket.OPEN) {
            this.conn.send(JSON.stringify(message))
        }
    }
}