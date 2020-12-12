import Image from 'next/image';

const cardsComponent = ({ card_table: cardTable }) => (
  <div className="card-table-container">
    {
      [3, 2, 1].map((level) => (
        <div key={level} className="card-level-row">

          <Image src={`/${level}_.png`} width="70" height="100" />
          {
            cardTable.up[level].map((card) => (
              <div className="card">
                <Image src={`/${card.image}.png`} width="70" height="100" />

              </div>
            ))
          }
        </div>
      ))
    }
  </div>
);
export default cardsComponent;
