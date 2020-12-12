import Image from 'next/image';

const dukeComponent = ({ dukes }) => (
  <div className="duke-container">
    {
      dukes.map((duke) => (
        <div key={duke.id} className="duke">
          <Image src={`/${duke.image}.png`} width="50" height="50" />
        </div>
      ))
    }
  </div>
);
export default dukeComponent;
