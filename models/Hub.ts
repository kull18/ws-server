import { Chanel } from "./Channel";
import { Client } from "./Client";
import { Message } from "./message";

export class Hub {
  clients: Map<string, Client>;

  constructor() {
    this.clients = new Map<string, Client>();
  }

  addClient(client: Client) {
    this.clients.set(client.id, client);
  }

  sendToAllClients(idClient: string, message: Message) {
    for(const [idSearch, client]of this.clients) {
      if(idClient === idSearch) {
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