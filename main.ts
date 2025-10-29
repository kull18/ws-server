import { WebSocketServer, WebSocket } from "ws";
import { Client } from "./models/Client";
import { parse } from  "url"
import { IncomingMessage } from "http";
import { Hub } from "./models/Hub";
import { randomUUID } from "crypto";

const hubHumidity: Hub = new Hub()
const hubTemperature: Hub = new Hub()


const wss = new WebSocketServer({ port: 8000 })

wss.on('connection', (req: IncomingMessage, ws: WebSocket, head: Buffer) =>  {
    const pathName = parse(req.url || '').pathname;

    if(!pathName) return ws.close

    if(pathName === "/humidity") handleConnection(hubHumidity, ws) 
    else if (pathName === "/temperature") handleConnection(hubTemperature, ws)
})


const handleConnection = (hub: Hub, wsConnection: WebSocket) => {
    const client: Client = new Client(randomUUID(),wsConnection, hub, false)
    console.log("client", client)
    hub.addClient(client)

    try {
        wsConnection.on('message', (message: string) => {
            hub.sendToAllClients("message", message)       
        })
    }catch(error) {
        console.log(`error from server: ${error}`)
    }
}