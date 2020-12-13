const dukeComponent = ({ dukes }) => (
  <div className="duke-container">
    {
      dukes.map((duke) => (
        <div key={duke.id} className="duke">
          <img src={`/${duke.image}.png`} />
        </div>
      ))
    }
  </div>
);
export default dukeComponent;
