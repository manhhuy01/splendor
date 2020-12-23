import Head from 'next/head';
import {
  useEffect, useState, useCallback, useReducer,
} from 'react';
import useSocket from '../utils/useSocket';
import useUnload from '../utils/useUnload';
import Welcome from '../components/welcome';
import RoomComponent from '../components/room';
import Game from '../components/game';
import { post } from '../utils/requets';
import Chat from '../components/chat';
import { initialState, reducer } from '../utils/reducer';
import { ActionContext } from '../utils/context';

export default function Home() {
  const socket = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [roomInfo, setRoomInfo] = useState({ rooms: [] });
  const [roomJoined, setRoomJoined] = useState(undefined);
  const [roomId, setRoomId] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
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
    if (roomId) {
      socket.on(`room.${roomId}.info`, (room) => {
        console.log('room', room);
        setRoomJoined(room);
      });
      socket.on(`room.${roomId}.chat`, (room) => {
        console.log('messages', room.messages);
        setMessages(room.messages);
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
    (numOfPlayer) => {
      post('start', { roomId: roomJoined.id, numOfPlayer })
        .then((res) => res.json()
          .then((data) => {
            if (data.error) {
              alert(data.error);
            }
          }));
    },
    [roomJoined],
  );

  const resetHandle = useCallback(
    (id) => {
      post('reset', { roomId: id })
        .then((res) => res.json()
          .then((data) => {
            if (data.error) {
              alert(data.error);
            }
          }));
    },
    [roomJoined],
  );

  const sendMessage = (text) => {
    socket.emit('chat', { text, roomId: roomJoined.id });
  };

  return (
    <ActionContext.Provider value={{ state, dispatch }}>

      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {!roomJoined
          && <Welcome joinRoom={joinRoom} rooms={roomInfo.rooms} reset={resetHandle} />}
          {roomJoined && !roomJoined.game.started
            && (
              <RoomComponent
                room={roomJoined}
                player={roomJoined.players.find(({ socketId }) => socketId === socket.id) || {}}
                start={startHandle}
              />
            )}
          {roomJoined && roomJoined.game.started
            && (
              <>
                <Game socket={socket} game={roomJoined.game} room={roomJoined} />
                <Chat
                  messages={messages || roomJoined.messages}
                  send={sendMessage}
                  socketId={socket.id}
                />
              </>
            )}

        </main>
      </div>
    </ActionContext.Provider>
  );
}
