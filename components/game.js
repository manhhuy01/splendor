import { useEffect, useState, useContext } from 'react';
import Profile from './profile';
import Chat from './chat';
import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards';
import Congratulation from './congratulation';
import { ActionContext } from '../utils/context';
import Instructions from './instructions';

const gameComponent = ({
  socket, game, room, messages, send,
}) => {
  const getPlayer = (turn) => room.players.find((x) => x.turn === turn);
  const currentUser = room.players.find((x) => x.socketId === socket.id);

  // if not currentUser
  if (!currentUser) {
    return null;
  }

  const [winners, setWinners] = useState([]);
  const { state } = useContext(ActionContext);

  useEffect(() => {
    if (game.winners) {
      const names = game.winners.map(
        (turn) => room.players.find((player) => +player.turn === +turn),
      ).filter(Boolean).map((x) => x.name);
      setWinners(names);
    }
  }, [game.finished]);

  let arrIndex = [1, 2, 3, 4];
  arrIndex = arrIndex.slice(currentUser.turn, 4)
    .concat(arrIndex.slice(0, currentUser.turn - 1));
  return (
    <div className="game">
      <div className="game__left">
        {
          arrIndex.map((turn) => (
            <Profile
              key={turn}
              player={state.room.game.players[turn]}
              user={getPlayer(turn)}
              currentTurn={game.currentTurn}
              hidden={currentUser.turn !== turn}
            />
          ))
        }
        <Instructions />
      </div>
      <div className="game__center">
        <div className="table-game">
          <CardComponent card_table={game.table.card_table} />
          <TokenComponent token={state.room.game.table.token} />
          <DukeComponent dukes={game.table.dukes} />
        </div>
        <div className="game__bottom">
          <Profile
            player={state.room.game.players[currentUser.turn]}
            user={getPlayer(currentUser.turn)}
            currentTurn={game.currentTurn}
            isCurrentPlayer
            socket={socket}
            room={room}
          />
          <Chat
            messages={messages}
            send={send}
            socketId={socket.id}
          />
        </div>
      </div>
      {
        game.finished && <Congratulation names={winners} />
      }
    </div>
  );
};

export default gameComponent;
