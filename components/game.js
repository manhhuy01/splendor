import { useCallback } from 'react';
import { post } from '../utils/requets';

const gameComponent = ({ socket, game, room }) => {
  const turn = room.players.find((x) => x.socketId === socket.id)?.turn;
  const myProfile = game.players[turn];

  const throwTurn = useCallback(
    () => {
      // socket.emit('action', { type: 'throw_turn', data: { roomId: room.id } });
      post('throw_turn', { roomId: room.id, socketId: socket.id });
    },
    [socket],
  );
  return (
    <div>
      <div>{`lượt hiện tại: ${game.currentTurn}`}</div>
      <div> table </div>
      {
        Object.keys(game.table.token).map((color) => (
          <div key={color}>
            {`${color}:${game.table.token[color]}`}
          </div>
        ))
      }
      <div> your profile </div>
      <div>
        {`your turn :${turn}`}
      </div>
      <div>your token</div>
      {
        Object.keys(myProfile.token).map((color) => (
          <div key={color}>
            {`${color}:${myProfile.token[color]}`}
          </div>
        ))
      }
      {
        turn === game.currentTurn && (
          <div>
            <div>Action</div>
            <div>
              <button type="button" onClick={throwTurn}>Bỏ lượt</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default gameComponent;
