import { useReducer } from 'react';
import Profile from './profile';
import ActionBoard from './action';
import { ActionContext } from '../utils/context';
import { initialState, reducer } from '../utils/reducer';
import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards';

const gameComponent = ({ socket, game, room }) => {
  const getUser = (turn) => room.players.find((x) => x.turn === turn);
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentUser = room.players.find((x) => x.socketId === socket.id);
  return (
    <ActionContext.Provider value={{ state, dispatch }}>
      <div className="game">
        <div className="game__left">
          <Profile
            player={room.game.players[1]}
            user={getUser(1)}
            currentTurn={game.currentTurn}
            hidden={currentUser.turn !== 1}
          />
          <Profile
            player={room.game.players[4]}
            user={getUser(4)}
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
            user={getUser(2)}
            currentTurn={game.currentTurn}
            hidden={currentUser.turn !== 2}
          />
          <Profile
            player={room.game.players[3]}
            user={getUser(3)}
            currentTurn={game.currentTurn}
            hidden={currentUser.turn !== 3}
          />
        </div>
        <ActionBoard socket={socket} room={room} />
      </div>
    </ActionContext.Provider>
  );
};

export default gameComponent;
