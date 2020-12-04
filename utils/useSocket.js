import { useLayoutEffect, useState } from 'react';
import io from 'socket.io-client';
import constants from '../constants';

const useSocket = (cb) => {
  const [activeSocket, setActiveSocket] = useState(null);

  useLayoutEffect(() => {
    const socket = io(constants.server);
    // debug("Socket updated", { socket, activeSocket });
    if (activeSocket || !socket) return;
    cb && cb(socket);
    setActiveSocket(socket);
    return function cleanup() {
      // debug("Running useSocket cleanup", { socket });
      socket.off('message.chat1', cb);
    };
  }, []);

  return activeSocket;
};
export default useSocket;
