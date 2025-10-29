import { WebSocket } from "ws"
import { Chanel } from "./Channel"
import { Hub } from "./Hub"


export class Client {
    readonly chanel: Chanel<string>
    readonly conn: WebSocket
    readonly hub: Hub
    readonly closed: boolean
    
    constructor(conn: WebSocket, hub: Hub, closed: boolean) {
        this.chanel = new Chanel<string>()
        this.conn = conn, 
        this.hub = hub,
        this.closed = closed
    }
}