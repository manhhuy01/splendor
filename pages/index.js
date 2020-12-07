import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import useSocket from '../utils/useSocket';
import useUnload from '../utils/useUnload';
import Welcome from '../components/welcome';
import RoomComponent from '../components/room';
import Game from '../components/game';

export default function Home() {
  const socket = useSocket();
  const [roomInfo, setRoomInfo] = useState({ rooms: [] });
  const [roomJoined, setRoomJoined] = useState(undefined);
  const [roomId, setRoomId] = useState(undefined);
  useEffect(() => {
    if (socket) {
      socket.on('roomInfo', (data) => {
        setRoomInfo(data);
      });
      socket.on('notification', (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(roomId);
    if (roomId) {
      socket.on(`room.${roomId}.info`, (room) => {
        console.log('room', room);
        setRoomJoined(room);
      });
    }
  }, [roomId]);

  useUnload(() => {
    socket && socket.disconnect();
  });

  const joinRoom = (id, name) => {
    socket.emit('action', { type: 'join', data: { roomId: id, name } });
    setRoomId(id);
  };

  const startHandle = useCallback(
    () => {
      socket.emit('action', { type: 'start', data: { roomId: roomJoined.id } });
    },
    [roomJoined],
  );

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!roomJoined && <Welcome joinRoom={joinRoom} rooms={roomInfo.rooms} />}
        {roomJoined && !roomJoined.game.started
          && (
            <RoomComponent
              room={roomJoined}
              player={roomJoined.players.find(({ socketId }) => socketId === socket.id) || {}}
              start={startHandle}
            />
          )}
        {roomJoined && roomJoined.game.started
        && <Game socket={socket} game={roomJoined.game} room={roomJoined} />}
      </main>
    </div>
  );
}
