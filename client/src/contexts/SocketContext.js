// contexts/SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const host = process.env.HOST || 'http://localhost:4000'
    const socketIo = io(host); // Update with your backend URL
    setSocket(socketIo);

    socketIo.on('temperatureData', (newData) => {
      console.log(newData);
      setData((prevData) => [...prevData, newData]);
    });

    return () => socketIo.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ data }}>
      {children}
    </SocketContext.Provider>
  );
};
