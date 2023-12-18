/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from 'react';
import constants from '../constants';
import TokenProfile from './tokenProfile';
import { ActionContext } from '../utils/context';
import Card from './card';

const getLevelCard = (cardId) => {
  if (cardId < 41) return 1;
  if (cardId < 71) return 2;
  if (cardId < 91) return 3;
  return undefined;
};

const profileComponent = ({
  player, user, currentTurn, hidden,
  isCurrentPlayer,
}) => {
  if (!player || !user) return null;
  const isMyTurn = user.turn === currentTurn;

  const { state, dispatch } = useContext(ActionContext);
  const isReturningToken = state.actionType === 'return_token';
  const [isReturnToken, setIsReturnToken] = useState(false);
  const onClickToken = (color) => {
    if (isReturnToken) {
      dispatch({
        type: 'return_token',
        color,
      });
    }
  };

  useEffect(() => {
    const sumToken = (token) => Object.keys(token).reduce((agg, item) => agg += token[item], 0);
    if (!hidden && sumToken(player.token) > 10 && !isReturnToken) {
      alert('Token đã lớn hơn 10, nhả token đi bạn');
      setIsReturnToken(true);
    }
    if (sumToken <= 10 && !isReturningToken) {
      setIsReturnToken(false);
    }
  }, [player, hidden, isReturningToken]);

  return (
    <div className={`profile ${isMyTurn ? 'current-turn' : ''} ${isCurrentPlayer ? 'current-player' : ''}`}>
      <div className="profile__name">{user.name}</div>
      <div className="profile__game">
        <div className="profile__game__token-cards">
          <div className="profile__game__token">
            <TokenProfile
              token={player.token}
              onClickToken={onClickToken}
            />
          </div>
          <div className="profile__game__cards">
            {
              constants.color.reduce((agg, color) => {
                if (color === 'gold') return agg;
                const cards = player.cards.filter((x) => x.property === color);
                return [
                  ...agg,
                  <div key={color} className={`profile__card profile__card--${cards.length ? color : 'empty'}`}>
                    {cards.length}
                  </div>];
              }, [])
            }
          </div>
        </div>
        <div className="profile__game__deposit">
          {
            !!player.deposit_cards.length && player.deposit_cards.map((card) => {
              const cardlevel = getLevelCard(card.id);
              if (hidden) return <Card key={card.id} level={cardlevel} noAction />;
              return (
                <Card key={card.id} card={card} isCardUp isCanBuy />
              );
            })
          }
        </div>
        {/* <div className="profile__game__duke">
          {
            !!player.dukes.length && <Duke dukes={player.dukes} />
          }
        </div> */}
      </div>
      <div className="profile__pv">
        {player.pv}
      </div>
    </div>
  );
};
export default profileComponent;
