/* eslint-disable jsx-a11y/alt-text */
import { useContext } from 'react';
import constants from '../constants';
import TokenProfile from './tokenProfile';
import { ActionContext } from '../utils/context';

const getLevelCard = (cardId) => {
  if (cardId < 41) return 1;
  if (cardId < 71) return 2;
  if (cardId < 91) return 3;
  return undefined;
};

const profileComponent = ({
  player, user, currentTurn, hidden,
}) => {
  if (!player || !user) return null;
  const isMyTurn = user.turn === currentTurn;

  const { state, dispatch } = useContext(ActionContext);
  const isBuyCard = state.actionType === 'buy_card';
  const isReturnToken = state.actionType === 'return_token';
  const onClickToken = (color) => {
    if (state.actionType) {
      dispatch({
        type: state.actionType,
        color,
      });
    }
  };

  const onClickDepositCard = (card) => {
    if (isBuyCard) {
      dispatch({
        type: 'buy_card',
        card,
      });
    }
  };
  return (
    <div className={`profile ${isMyTurn ? 'my-turn' : ''} `}>
      <div className="profile__name">{user.name}</div>
      <div className="profile__game">
        <div className={`profile__game__deposit ${isBuyCard && !hidden ? 'selecting' : ''}`}>
          {
            !!player.deposit_cards.length && player.deposit_cards.map((card) => {
              const cardlevel = getLevelCard(card.id);
              if (hidden) return <img key={card.id} src={`/${cardlevel}_.png`} style={{ height: '80px', width: 'auto' }} />;
              return (
                <img
                  key={card.id}
                  src={`/${card.image}.png`}
                  style={{ height: '80px', width: 'auto' }}
                  onClick={() => onClickDepositCard(card)}
                />
              );
            })
          }
        </div>
        <div className="profile__game__token-cards">
          <div className="profile__game__token">
            <TokenProfile
              token={player.token}
              selecting={(isBuyCard || isReturnToken) && !hidden}
              onClickToken={onClickToken}
            />
          </div>
          <div className="profile__game__cards">
            {
              constants.color.reduce((agg, color) => {
                const cards = player.cards.filter((x) => x.property === color);

                if (cards.length) {
                  return [
                    ...agg,
                    <div key={color} className="profile__card__column">
                      {
                        cards.map((card) => <img key={card.id} src={`/${card.image}.png`} className="profile__card" />)
                      }
                    </div>];
                }

                return agg;
              }, [])
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default profileComponent;
