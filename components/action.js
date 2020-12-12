import { useCallback, useContext } from 'react';
import Image from 'next/image';
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

  const onClearAction = useCallback(() => {
    dispatch({
      type: 'reset',
    });
  }, [state]);

  const depositCard = useCallback(
    () => {
      dispatch({
        type: 'deposit_card',
      });
    },
    [state],
  );

  const finishDeposit = useCallback(
    () => {
      post('deposit_card', {
        roomId: room.id,
        socketId: socket.id,
        deposit_card_id: state.deposit_card_id,
        deposit_card_level: state.deposit_card_level,
      })
        .then((res) => res.json()
          .then((data) => {
            if (data.error) {
              alert(data.error);
            }
          }));
      dispatch({
        type: 'reset',
      });
    },
    [state],
  );

  const buyCard = useCallback(
    () => {
      dispatch({
        type: 'buy_card',
      });
    },
    [state],
  );

  const finishBuyCard = useCallback(() => {
    // vaildate
    // if ok
    post('buy_card', {
      roomId: room.id, socketId: socket.id, token: state.token, card_id: state.card.id,
    })
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

  const returnToken = useCallback(
    () => {
      dispatch({
        type: 'return_token',
      });
    },
    [state],
  );

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
            <button type="button" onClick={buyCard}>Mua bài</button>
            <button type="button" onClick={depositCard}>Đặt cọc</button>
            <button type="button" onClick={returnToken}>Trả token</button>
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
        isMyTurn && state.actionType === 'deposit_card' && (
          <div>
            <div>Đang chọn</div>
            {
              state.card && (
                <Image src={`/${state.card.image}.png`} width="50" height="72" layout="fixed" />
              )
            }
            {
              state.deposit_card_level && (
                <Image src={`/${state.deposit_card_level}_.png`} width="50" height="72" layout="fixed" />
              )
            }
            <div className="action__confirm">
              <button type="button" onClick={onClearAction}>Làm lại</button>
              <button type="button" onClick={finishDeposit}>OK</button>
            </div>

          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'buy_card' && (
          <div>
            <div>Token mua</div>
            <div className="action-buy__material">
              {
                state.card && (
                  <Image src={`/${state.card.image}.png`} width="50" height="72" layout="fixed" />
                )
              }
              <TokenProfile token={state.token || {}} />
            </div>

            <div className="action__confirm">
              <button type="button" onClick={onClearAction}>Làm lại</button>
              <button type="button" onClick={finishBuyCard}>OK</button>
            </div>

          </div>
        )
      }
      {
        isMyTurn && state.actionType === 'return_token' && (
          <div>
            <span>Trả token</span>
            <TokenProfile token={state.token || {}} />
            <div className="action__confirm">
              <button type="button" onClick={onClearAction}>Làm lại</button>
              <button type="button" onClick={finishReturnToken}>OK</button>
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
