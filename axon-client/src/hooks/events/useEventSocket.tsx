import { useEffect, useMemo, useRef } from "react";
import SocketManager, { Message } from "../../api/events/socket";

const useEventSocket = () => {
  const socketManagerRef = useRef<SocketManager | null>(null);

  useEffect(() => {
    if (!socketManagerRef.current) {
      console.log("Init");
      socketManagerRef.current = new SocketManager();
    }
  }, []);

  const sendMessage = async (message: Message): Promise<void> => {
    console.log("sendMessage", message);
    await socketManagerRef.current?.sendMessage(message);
  };

  const disconnect = () => {
    socketManagerRef.current?.disconnect();
  };

  return {
    isAutoSave: socketManagerRef.current?.status(),
    sendMessage,
    disconnect,
  };
};

export default useEventSocket;
