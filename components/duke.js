import Image from 'next/image';

const dukeComponent = ({ duke_table: dukeTable }) => (
  <div className="duke-container">
    {
        dukeTable.map((duke) => (
          <div key={duke.id} className="duke">
            <Image src={`/${duke.image}`} width="50" height="50" />
          </div>
        ))
      }
  </div>
);
export default dukeComponent;
