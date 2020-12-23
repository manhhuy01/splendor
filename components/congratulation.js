import { useEffect } from 'react';
import Modal from './modal';

const congratulation = ({ names = [] }) => {
  useEffect(() => {
    const elements = document.getElementsByClassName('bullet');
    const bullets = Array.from(elements);
    bullets.forEach((element, index) => {
      const width = 15 + Math.floor(Math.random() * 15);
      elements[index].style.setProperty('--animation-width', `${width}vw`);
      elements[index].style.setProperty('animation-name', 'bullet-animation');
    });
  }, []);
  return (
    <Modal>
      <div className="congratulation">
        <div className="img-container">
          <img src="/winner.png" className="img-winner" />
        </div>
        <div className="winner-names">
          {
            names.map((name) => (
              <div key={name} className="winner-name">{name}</div>
            ))
          }
        </div>
        <div className="pyro">
          <div className="before" />
          <div className="after" />
        </div>
      </div>
    </Modal>
  );
};
export default congratulation;
