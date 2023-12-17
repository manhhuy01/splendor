import { useEffect, useState, useContext } from 'react';
import Profile from './profile';
import ActionBoard from './actionBoard';
import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards';
import Congratulation from './congratulation';
import { ActionContext } from '../utils/context';

const gameComponent = ({ socket, game, room }) => {
  const getPlayer = (turn) => room.players.find((x) => x.turn === turn);
  const currentUser = room.players.find((x) => x.socketId === socket.id);
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
        <Profile
          player={state.room.game.players[currentUser.turn]}
          user={getPlayer(currentUser.turn)}
          currentTurn={game.currentTurn}
          isCurrentPlayer
        />

      </div>
      <div className="game__center">
        <div className="table-game">
          <DukeComponent dukes={game.table.dukes} />
          <CardComponent card_table={game.table.card_table} />
          <TokenComponent token={state.room.game.table.token} />
        </div>
      </div>
      {
        !game.finished && <ActionBoard socket={socket} room={room} />
      }
      {
        game.finished && <Congratulation names={winners} />
      }
    </div>
  );
};

export default gameComponent;
