/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useContext } from 'react';
import { useAtom } from 'jotai';
import { post } from '../utils/requets';
import { ActionContext } from '../utils/context';

import { isReturnToken } from '../atoms/action';
import constants from '../constants';

const TokenComponent = ({ token, onClickToken }) => (
  <div className="token-container">
    {
      constants.color.reduce((agg, color) => [...agg, (
        token[color]
          ? (
            <div className={`token token--${color}`} onClick={() => onClickToken && onClickToken(color)}>
              <div className="token__number">
                {token[color]}
              </div>
            </div>
          ) : null
      )], [])
    }
  </div>
);

const actionComponent = ({ socket, room }) => {
  const { state, dispatch } = useContext(ActionContext);
  const player = room.players.find((x) => x.socketId === socket.id);
  if (!player) return null;
  const isMyTurn = room.game.currentTurn === player.turn;
  const [, setIsReturnToken] = useAtom(isReturnToken);

  const throwTurn = useCallback(
    () => {
      // socket.emit('action', { type: 'throw_turn', data: { roomId: room.id } });
      post('throw_turn', { roomId: room.id, socketId: socket.id });
    },
    [socket],
  );

  const undoCollectToken = useCallback((color) => {
    dispatch({
      type: 'undo_collect_token',
      color,
    });
  }, [state]);

  const undoReturnToken = useCallback((color) => {
    dispatch({
      type: 'undo_return_token',
      color,
    });
  }, [state]);

  const finishCollect = useCallback(() => {
    // validate
    // if ok
    post('collect_token', { roomId: room.id, socketId: socket.id, token: state.token })
      .then((res) => res.json()
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
        }));
    dispatch({
      type: 'reset',
    });
  }, [state]);

  const finishReturnToken = useCallback(() => {
    // vaildate
    // if ok
    post('return_token', { roomId: room.id, socketId: socket.id, token: state.token })
      .then((res) => res.json()
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
        }));
    setIsReturnToken(false);
    dispatch({
      type: 'reset',
    });
  }, [state]);

  return (
    <div className={`action-board ${isMyTurn ? 'active' : ''}`}>
      {
        isMyTurn && !state.actionType && (
          <div className="action-container">
            <div className="action-buttons-fixed">
              <button className="action__cancel" type="button" onClick={throwTurn}>Bỏ lượt</button>
            </div>
          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'collect_token' && (
          <div className="action-container">
            <TokenComponent token={state.token || {}} onClickToken={undoCollectToken} />
            <div className="action-buttons-fixed">
              <button className="action__confirm" type="button" onClick={finishCollect}>OK</button>
            </div>
          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'return_token' && (
          <div className="action-container">
            <TokenComponent token={state.token || {}} onClickToken={undoReturnToken} />
            <div className="action-buttons-fixed">
              <button className="action__confirm" type="button" onClick={finishReturnToken}>OK</button>
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
