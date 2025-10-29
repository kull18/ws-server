import { Chanel } from "./Channel";
import { Client } from "./Client";

export class Hub {
  clients: Map<string, Client>;

  constructor() {
    this.clients = new Map<string, Client>();
  }

  addClient(client: Client) {
    this.clients.set(client.id, client);
  }

  sendToAllClients(idClient: string, message: string) {
    for(const [id, client] of this.clients) {
      if(id !== idClient) {
        client.send(message)
      }
    }
  }

  removeClient(id: string) {
    const client = this.clients.get(id);
    if (client) {
      this.clients.delete(id);
    }
  }

  broadcastSender(idClient: string, message: string) {
    const client = this.clients.get(idClient)
    if(client) client.conn.send(message); 
  }
}