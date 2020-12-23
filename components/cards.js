import { useContext } from 'react';
import { ActionContext } from '../utils/context';

const cardsComponent = ({ card_table: cardTable }) => {
  const { state, dispatch } = useContext(ActionContext);
  const isDeposit = state.actionType === 'deposit_card';
  const isBuyCard = state.actionType === 'buy_card';
  const onClickCard = (card) => () => {
    if (isDeposit) {
      dispatch({
        type: 'deposit_card',
        deposit_card_id: card.id,
        card,
      });
    }
    if (isBuyCard) {
      dispatch({
        type: 'buy_card',
        card,
      });
    }
  };
  const onClickCartDown = (level) => () => {
    if (isDeposit) {
      dispatch({
        type: 'deposit_card',
        deposit_card_level: level,
      });
    }
  };
  return (
    <div className={`card-table-container ${isDeposit || isBuyCard ? 'selecting' : ''}`}>
      {
        [3, 2, 1].map((level) => (
          <div key={level} className="card-level-row">
            {
              !!cardTable.down[level].length && <img className="card" src={`/${level}_.png`} onClick={onClickCartDown(level)} />
            }
            {
              cardTable.up[level].map((card) => (
                <img key={card.id} className="card card--up" src={`/${card.image}.png`} onClick={onClickCard(card)} />
              ))
            }
          </div>
        ))
      }
    </div>
  );
};
export default cardsComponent;
