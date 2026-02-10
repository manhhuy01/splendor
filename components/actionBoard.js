/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useContext, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const player = room.players.find((x) => x.socketId === socket.id);
  if (!player) return null;
  const isMyTurn = room.game.currentTurn === player.turn;
  const [, setIsReturnToken] = useAtom(isReturnToken);

  const throwTurn = useCallback(
    () => {
      setLoading(true);
      // socket.emit('action', { type: 'throw_turn', data: { roomId: room.id } });
      post('throw_turn', { roomId: room.id, socketId: socket.id })
        .finally(() => setLoading(false));
    },
    [socket, room.id],
  );

  const undoCollectToken = useCallback((color) => {
    dispatch({
      type: 'undo_collect_token',
      color,
    });
  }, [dispatch]);

  const undoReturnToken = useCallback((color) => {
    dispatch({
      type: 'undo_return_token',
      color,
    });
  }, [dispatch]);

  const finishCollect = useCallback(() => {
    setLoading(true);
    // validate
    // if ok
    post('collect_token', { roomId: room.id, socketId: socket.id, token: state.token })
      .then((res) => res.json()
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
        }))
      .finally(() => {
        setLoading(false);
        dispatch({
          type: 'reset',
        });
      });
  }, [room.id, socket.id, state.token, dispatch]);

  const finishReturnToken = useCallback(() => {
    setLoading(true);
    // vaildate
    // if ok
    post('return_token', { roomId: room.id, socketId: socket.id, token: state.token })
      .then((res) => res.json()
        .then((data) => {
          if (data.error) {
            alert(data.error);
          }
        }))
      .finally(() => {
        setLoading(false);
        setIsReturnToken(false);
        dispatch({
          type: 'reset',
        });
      });
  }, [room.id, socket.id, state.token, setIsReturnToken, dispatch]);

  return (
    <div className={`action-board ${isMyTurn ? 'active' : ''}`}>
      {
        isMyTurn && !state.actionType && (
          <div className="action-container">
            <div className="action-buttons-fixed">
              <button className="action__cancel" type="button" onClick={throwTurn} disabled={loading}>
                {loading && <div className="spinner" />}
                {loading ? 'Đang bỏ lượt...' : 'Bỏ lượt'}
              </button>
            </div>
          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'collect_token' && (
          <div className="action-container">
            <TokenComponent token={state.token || {}} onClickToken={undoCollectToken} />
            <div className="action-buttons-fixed">
              <button className="action__confirm" type="button" onClick={finishCollect} disabled={loading}>
                {loading && <div className="spinner" />}
                {loading ? 'Đang thực hiện...' : 'OK'}
              </button>
            </div>
          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'return_token' && (
          <div className="action-container">
            <TokenComponent token={state.token || {}} onClickToken={undoReturnToken} />
            <div className="action-buttons-fixed">
              <button className="action__confirm" type="button" onClick={finishReturnToken} disabled={loading}>
                {loading && <div className="spinner" />}
                {loading ? 'Đang thực hiện...' : 'OK'}
              </button>
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
