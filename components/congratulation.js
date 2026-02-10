import Modal from './modal';

const congratulation = ({ names = [] }) => {
  const handleBackToLobby = () => {
    window.location.reload();
  };

  return (
    <Modal>
      <div className="congratulation">
        <div className="img-container">
          <img src="/winner.png" className="img-winner" alt="winner" />
        </div>

        <h2 className="title">Victory!</h2>

        <div className="winner-list">
          {
            names.map((winner, index) => (
              <div key={winner.name} className="winner-card">
                <div className="winner-info">
                  <span className="winner-rank">{index + 1}</span>
                  <span className="winner-name">{winner.name}</span>
                </div>
                <div className="winner-score">
                  {winner.score} PV
                </div>
              </div>
            ))
          }
        </div>

        <button
          className="congratulation-btn"
          type="button"
          onClick={handleBackToLobby}
        >
          Trang chủ
        </button>

        <div className="pyro">
          <div className="before" />
          <div className="after" />
        </div>
      </div>
    </Modal>
  );
};
export default congratulation;
