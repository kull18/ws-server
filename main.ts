import { WebSocketServer, WebSocket } from "ws";
import { Client } from "./models/Client";
import { IncomingMessage } from "http";
import { Hub } from "./models/Hub";
import url from "url";

const hubHumidity: Hub = new Hub()
const hubTemperature: Hub = new Hub()
const defaulthub: Hub = new Hub()


//todo esto puede ser manejado en un clase server dado este ejemplo y porque me dio hueva lo hice en el main aunque debio ser en una clase xD.
const wss = new WebSocketServer({ port: 8000 })

wss.on('connection', (ws: WebSocket, req: IncomingMessage) =>  {
    const urlParsed = url.parse(req.url || "")

    const pathname = urlParsed.pathname; 

    if(pathname === "/humidity") handleConnection(hubHumidity, ws) 
    else if (pathname === "/temperature") handleConnection(hubTemperature, ws)
    else {handleConnection(defaulthub, ws)}
})


const handleConnection = (hub: Hub, wsConnection: WebSocket) => {
    const client: Client = new Client("1",wsConnection, hub, false)
    hub.addClient(client)
    try {
        wsConnection.on('message', (message: any) => {
            const newMessage = JSON.parse(message)
            console.log("new message recived", newMessage)
            hub.sendToAllClients("1", newMessage)       
        })

        wsConnection.on("error", () =>  {
            hub.removeClient(client.id)
        })
    }catch(error) {
        console.log(`error from server: ${error}`)
    }
}