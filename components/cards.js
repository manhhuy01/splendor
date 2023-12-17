import Card from './card';

const CardsComponent = ({ card_table: cardTable }) => (
  <div className="card-table-container">
    {
        [3, 2, 1].map((level) => (
          <div key={level} className="card-level-row">
            {
              !!cardTable.down[level].length
              && <Card key={level} level={level} isCanDeposit />
            }
            {
              cardTable.up[level].map((card) => (
                <Card
                  key={card.id}
                  isCardUp
                  card={card}
                  isCanBuy
                  isCanDeposit
                />
              ))
            }
          </div>
        ))
      }
  </div>
);
export default CardsComponent;
