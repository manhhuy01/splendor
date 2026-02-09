/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import constants from '../constants';
import TokenProfile from './tokenProfile';
import { ActionContext } from '../utils/context';
import Card from './card';
import { isReturnToken } from '../atoms/action';
import ActionBoard from './actionBoard';

const getLevelCard = (cardId) => {
  if (cardId < 41) return 1;
  if (cardId < 71) return 2;
  if (cardId < 91) return 3;
  return undefined;
};

const profileComponent = ({
  player, user, currentTurn, hidden,
  isCurrentPlayer, socket, room,
}) => {
  if (!player || !user) return null;
  const isMyTurn = user.turn === currentTurn;

  const { dispatch } = useContext(ActionContext);
  const [_isReturnToken, setIsReturnToken] = useAtom(isReturnToken);

  const onClickToken = (color) => {
    if (isReturnToken) {
      dispatch({
        type: 'return_token',
        color,
      });
    }
  };

  useEffect(() => {
    if (isCurrentPlayer && isMyTurn) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch((e) => console.log('Audio play failed:', e));
    }
  }, [isMyTurn, isCurrentPlayer]);

  useEffect(() => {
    const sumToken = (token) => Object.keys(token).reduce((agg, item) => agg += token[item], 0);
    if (isCurrentPlayer && isMyTurn && sumToken(player.token) > 10 && !_isReturnToken) {
      alert('Token đã lớn hơn 10, nhả token đi bạn');
      setIsReturnToken(true);
    }
  }, [player, hidden, _isReturnToken, isCurrentPlayer]);

  const totalToken = Object.keys(player.token).reduce((agg, item) => agg += player.token[item], 0);

  return (
    <div className={`profile ${isMyTurn ? 'current-turn' : ''} ${isCurrentPlayer ? 'current-player' : ''}`}>
      <div className="profile__name">{user.name}</div>
      <div className="profile__main">
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
            {
              isCurrentPlayer && <div className="profile__game__total-token">{`${totalToken}/10`}</div>
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

        {
          isCurrentPlayer && (
            <div className="profile__action">
              <ActionBoard socket={socket} room={room} />
            </div>
          )
        }
      </div>
      <div className="profile__pv">
        {player.pv}
      </div>
    </div>
  );
};
export default profileComponent;
