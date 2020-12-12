import { useCallback, useContext } from 'react';
import { post } from '../utils/requets';
import { ActionContext } from '../utils/context';
import TokenProfile from './tokenProfile';

const actionComponent = ({ socket, room }) => {
  const { state, dispatch } = useContext(ActionContext);
  const player = room.players.find((x) => x.socketId === socket.id);
  if (!player) return null;
  const isMyTurn = room.game.currentTurn === player.turn;

  const throwTurn = useCallback(
    () => {
      // socket.emit('action', { type: 'throw_turn', data: { roomId: room.id } });
      post('throw_turn', { roomId: room.id, socketId: socket.id });
    },
    [socket],
  );

  const collectToken = useCallback(() => {
    dispatch({
      type: 'collect_token',
    });
  }, [state]);

  const finishCollect = useCallback(() => {
    // vaildate
    // if ok
    post('collect_token', { roomId: room.id, socketId: socket.id, token: state.token });
    dispatch({
      type: 'reset',
    });
  }, [state]);

  const onClearAction = useCallback(() => {
    dispatch({
      type: 'reset',
    });
  }, [state]);
  return (
    <div className={`action-board ${isMyTurn ? 'active' : ''}`}>
      {
        isMyTurn && !state.actionType && (
          <div className="action-container">
            <button type="button" onClick={collectToken}>Bốc token</button>
            <button type="button">Mua bài</button>
            <button type="button">Đặt cọc</button>
            <button type="button">Trả token</button>
            <button type="button" onClick={throwTurn}>Bỏ lượt</button>
          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'collect_token' && (
          <div>
            <span>Đang bốc</span>
            <TokenProfile token={state.token || {}} />
            <div className="action__confirm">
              <button type="button" onClick={onClearAction}>Làm lại</button>
              <button type="button" onClick={finishCollect}>OK</button>
            </div>

          </div>
        )
      }
      {
        !isMyTurn && (<span> vui lòng chờ tới lượt </span>)
      }
    </div>
  );
};
export default actionComponent;
