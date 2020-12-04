import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSocket from '../utils/useSocket';
import useUnload from '../utils/useUnload';
import Room from '../components/room';

export default function Home() {
  const socket = useSocket();
  const [roomInfo, setRoomInfo] = useState({ rooms: [] });
  const [roomJoined, setRoomJoined] = useState(undefined);

  useEffect(() => {
    if (socket) {
      socket.on('roomInfo', (data) => {
        setRoomInfo(data);
      });
      socket.on('notification', (data) => {
        console.log(data);
      });
      socket.on('join', (room) => {
        setRoomJoined(room);
      });
    }
  }, [socket]);

  useUnload(() => {
    socket && socket.disconnect();
  });

  const joinRoom = (id) => {
    socket.emit('action', { type: 'join', data: { id } });
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to Splendor
        </h1>
        {!roomJoined && <Room joinRoom={joinRoom} rooms={roomInfo.rooms} />}
      </main>
    </div>
  );
}
