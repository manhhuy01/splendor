import Head from 'next/head';
import {
  useEffect, useState, useCallback, useReducer,
} from 'react';
import { useAtom } from 'jotai';
import useSocket from '../utils/useSocket';
import useUnload from '../utils/useUnload';
import Welcome from '../components/welcome';
import RoomComponent from '../components/room';
import Game from '../components/game';
import { post } from '../utils/requets';
import Chat from '../components/chat';
import { initialState, reducer } from '../utils/reducer';
import { ActionContext } from '../utils/context';
import { playerName } from '../atoms/action';

export default function Home() {
  const socket = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [roomInfo, setRoomInfo] = useState({ rooms: [] });
  const [roomJoined, setRoomJoined] = useState(undefined);
  const [roomId, setRoomId] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [name] = useAtom(playerName);

  const joinRoom = (id) => {
    socket.emit('action', { type: 'join', data: { roomId: id, name } });
    setRoomId(id);
  };

  useEffect(() => {
    if (socket) {
      socket.on('roomInfo', (data) => {
        setRoomInfo(data);
        const room = data.rooms[roomId];
        if (room) {
          dispatch({ type: 'set_room_info', room });
        }
      });
      socket.on('notification', (data) => {
        console.log(data);
      });
      socket.io.on('reconnect', () => {
        joinRoom(roomId, name);
      });
    }
  }, [socket, roomId]);

  useEffect(() => {
    if (socket?.id) {
      dispatch({ type: 'set_socket', socket });
    }
  }, [socket?.id]);

  useEffect(() => {
    if (roomId) {
      socket.on(`room.${roomId}.info`, (room) => {
        console.log('room', room);
        setRoomJoined(room);
        dispatch({ type: 'set_room_info', room });
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
          <title>Splendor</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/splendor192.png" />
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
