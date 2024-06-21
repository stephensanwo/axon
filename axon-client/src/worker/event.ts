// import SocketManager from "src/api/events/socket";
// import { Message } from "src/types/event";

// let socketManager: SocketManager | null = null;
// export function getSocketManager(): SocketManager {
//   if (!socketManager) {
//     socketManager = new SocketManager();
//   }
//   return socketManager;
// }

// getSocketManager().connect();

// addEventListener("message", (event) => {
//   console.log("initializeSocketManager from Worker 1");
//   if (event.data.type === "initializeSocketManager") {
//     console.log("initializeSocketManager from Worker");
//   } else if (event.data.type === "sendMessage" && socketManager) {
//     const message: Message = event.data.message;
//     socketManager
//       .sendMessage(message)
//       .then(() => {
//         postMessage({ type: "sendMessageSuccess" });
//       })
//       .catch((error) => {
//         postMessage({ type: "sendMessageError", error });
//       });
//   }
// });
