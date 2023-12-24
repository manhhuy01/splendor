import { Popover, Button, Space } from 'antd';
import { useContext } from 'react';
import { post } from '../utils/requets';
import { ActionContext } from '../utils/context';

const CardComponent = ({
  card, isCardUp, level,
  isCanDeposit, isCanBuy,
}) => {
  const { state } = useContext(ActionContext);
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
  };

  const isMyTurn = room.game.currentTurn === room.players.find(
    (player) => player.socketId === socket.id,
  )?.turn;

  const content = (
    <Space direction="vertical">
      {isCanBuy && <Button disabled={!isMyTurn} onClick={onClickBuyCard}>Mua bài</Button> }
      {isCanDeposit && <Button disabled={!isMyTurn} onClick={onClickDepositCard}>Đặt cọc</Button> }
    </Space>
  );

  const source = level ? `/${level}_.jpg` : `/${card.image}.jpg`;
  if (!isCanDeposit && !isCanBuy) return <img className={`card ${isCardUp ? 'card-up' : ''}`} src={source} />;
  return (
    <Popover content={content} placement="right" trigger="click">
      <img className={`card ${isCardUp ? 'card-up' : ''}`} src={source} />
    </Popover>
  );
};

export default CardComponent;
