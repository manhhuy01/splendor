import { useReducer } from 'react';
import TableGame from './tableGame';
import Profile from './profile';
import ActionBoard from './action';
import { ActionContext } from '../utils/context';
import { initialState, reducer } from '../utils/reducer';

const gameComponent = ({ socket, game, room }) => {
  const getUser = (turn) => room.players.find((x) => x.turn === turn);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ActionContext.Provider value={{ state, dispatch }}>
      <div className="game">
        <div className="game__left">
          <Profile player={room.game.players[1]} user={getUser(1)} currentTurn={game.currentTurn} />
          <Profile player={room.game.players[4]} user={getUser(4)} currentTurn={game.currentTurn} />
        </div>
        <div className="game__center">
          <TableGame table={game.table} />
        </div>
        <div className="game__right">
          <Profile player={room.game.players[2]} user={getUser(2)} currentTurn={game.currentTurn} />
          <Profile player={room.game.players[3]} user={getUser(3)} currentTurn={game.currentTurn} />
        </div>
        <ActionBoard socket={socket} room={room} />
      </div>
    </ActionContext.Provider>
  );
};

export default gameComponent;
