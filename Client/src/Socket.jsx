/* eslint-disable react/prop-types */
import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constant/config";

const SocketContext = createContext();

const GetSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, GetSocket };
