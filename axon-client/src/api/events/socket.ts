import * as io from "socket.io-client";
import { Message } from "src/types/event";

class SocketManager {
  private socket: any;
  private options: any;

  constructor() {
    const options: any = {
      transportOptions: {
        polling: {
          extraHeaders: {
            "Access-Token": "ue1pk_GNl2ohk_Wdz4oLNfJzWUEf8VF09H4gF3NkyWQ=",
          },
        },
        transport: {
          extraHeaders: {
            "Access-Token": "ue1pk_GNl2ohk_Wdz4oLNfJzWUEf8VF09H4gF3NkyWQ=",
          },
        },
      },
    };

    this.options = options;
    this.socket = io("http://127.0.0.1:8201", this.options); // Initialize the socket connection
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect(); // Connect to the socket
      console.log("Socket connected", this.socket);
    }
  }

  status() {
    return this.socket.connected;
  }

  async sendMessage(message: Message): Promise<void> {
    await this.socket.emit("message", message);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}

export default SocketManager;
