import { useContext, useEffect, useRef } from "react";
import SocketManager from "../../api/events/socket";
import { Message } from "src/types/event";
import AuthContext from "src/context/auth";

const useEventSocket = (): {
  isAutoSave: boolean;
  sendMessage: (data: any) => Promise<void>;
  disconnect: () => void;
} => {
  const socketManagerRef = useRef<SocketManager | null>(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("useEventSocket.tsx");
    if (!socketManagerRef.current) {
      socketManagerRef.current = new SocketManager();
    }
  }, []);

  const sendMessage = async (data: any): Promise<void> => {
    const message: Message = {
      event: "UPDATE_NOTE",
      data,
      user: user.current?.email!!,
      timestamp: new Date().toISOString(),
    };
    console.log("useEventSocket.tsx sendMessage", message);
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
