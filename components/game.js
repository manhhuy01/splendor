import { useEffect, useState } from 'react';
import Profile from './profile';
import ActionBoard from './action';
import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards';
import Congratulation from './congratulation';

const gameComponent = ({ socket, game, room }) => {
  const getPlayer = (turn) => room.players.find((x) => x.turn === turn);
  const currentUser = room.players.find((x) => x.socketId === socket.id);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    if (game.winners) {
      const names = game.winners.map(
        (turn) => room.players.find((player) => player.turn === turn),
      ).filter(Boolean).map((x) => x.name);
      setWinners(names);
    }
  }, [game.finished]);
  return (
    <div className="game">
      <div className="game__left">
        <Profile
          player={room.game.players[1]}
          user={getPlayer(1)}
          currentTurn={game.currentTurn}
          hidden={currentUser.turn !== 1}
        />
        <Profile
          player={room.game.players[4]}
          user={getPlayer(4)}
          currentTurn={game.currentTurn}
          hidden={currentUser.turn !== 4}
        />
      </div>
      <div className="game__center">
        <div className="table-game">
          <DukeComponent dukes={game.table.dukes} />
          <CardComponent card_table={game.table.card_table} />
          <TokenComponent token={game.table.token} />
        </div>
      </div>
      <div className="game__right">
        <Profile
          player={room.game.players[2]}
          user={getPlayer(2)}
          currentTurn={game.currentTurn}
          hidden={currentUser.turn !== 2}
        />
        <Profile
          player={room.game.players[3]}
          user={getPlayer(3)}
          currentTurn={game.currentTurn}
          hidden={currentUser.turn !== 3}
        />
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
