import { WebSocketServer, WebSocket } from "ws";
import { Client } from "./models/Client";
import { parse } from  "url"
import { IncomingMessage } from "http";
import { Hub } from "./models/Hub";

const hubHumidity: Hub = new Hub()
const hubTemperature: Hub = new Hub()


const wss = new WebSocketServer({ port: 8000})

wss.on('connection', (req: IncomingMessage, ws: WebSocket, head: Buffer) =>  {
    const pathName = parse(req.url || '').pathname;

    if(!pathName) return ws.close

    
})


const handleConnection = (hub: Hub, pathName: string,client: Client) => {

}