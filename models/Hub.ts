import { Chanel } from "./Channel";
import { Client } from "./Client";

export class Hub {
  clients: Map<string, Client>;
  broadcast: Chanel<string>;
  unregister: Chanel<Client>;
  register: Chanel<Client>;

  constructor() {
    this.clients = new Map<string, Client>();
    this.broadcast = new Chanel<string>();
    this.unregister = new Chanel<Client>();
    this.register = new Chanel<Client>();
  }

  addClient(id: string, client: Client) {
    this.clients.set(id, client);
    this.register.send(client);
  }

  removeClient(id: string) {
    const client = this.clients.get(id);
    if (client) {
      this.clients.delete(id);
      this.unregister.send(client);
    }
  }

  sendToAll(message: string) {
    this.broadcast.send(message);
  }
}