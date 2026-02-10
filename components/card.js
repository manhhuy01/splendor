import { Popover } from 'antd';
import { useContext } from 'react';
import { post } from '../utils/requets';
import { ActionContext } from '../utils/context';

const CardComponent = ({
  card, isCardUp, level,
  isCanDeposit, isCanBuy,
}) => {
  const { state, dispatch } = useContext(ActionContext);
  const { room, socket } = state;

  const onClickBuyCard = () => {
    post('buy_card', {
      roomId: room.id, socketId: socket.id, card_id: card.id,
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
  };

  const onClickDepositCard = () => {
    post('deposit_card', {
      roomId: room.id,
      socketId: socket.id,
      deposit_card_id: card && card.id,
      deposit_card_level: level,
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
  };

  const isMyTurn = room.game.currentTurn === room.players.find(
    (player) => player.socketId === socket.id,
  )?.turn;

  const content = (
    <div className="card-popover-container">
      {isCanBuy && (
        <button
          className="popover-btn"
          disabled={!isMyTurn}
          onClick={onClickBuyCard}
          type="button"
        >
          <span className="icon">💎</span>
          Mua bài
        </button>
      )}
      {isCanDeposit && (
        <button
          className="popover-btn"
          disabled={!isMyTurn}
          onClick={onClickDepositCard}
          type="button"
        >
          <span className="icon">🔖</span>
          Đặt cọc
        </button>
      )}
    </div>
  );

  const source = level ? `/${level}_.jpg` : `/${card.image}.jpg`;
  if (!isCanDeposit && !isCanBuy) return <img className={`card ${isCardUp ? 'card-up' : ''}`} src={source} alt="card" />;
  return (
    <Popover
      content={content}
      placement="right"
      trigger="click"
      overlayClassName="card-popover"
    >
      <img className={`card ${isCardUp ? 'card-up' : ''}`} src={source} alt="card" />
    </Popover>
  );
};

export default CardComponent;
