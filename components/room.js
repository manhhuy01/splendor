const roomComponent = ({ room, player: { name }, start }) => (
  <div>
    <h1 className="title">
      Welcome to Splendor
    </h1>
    <div>
      Id phòng:
      {room.id}
    </div>
    <div>
      Tên:
      {name}
    </div>
    <div>
      Hiện có:
      {room.players.map((x) => x.name).join()}
    </div>
    <button type="button" onClick={() => start(2)}>Start 2 player</button>
    <button type="button" onClick={() => start(3)}>Start 3 player</button>
    <button type="button" onClick={() => start(4)}>Start 4 player</button>

  </div>
);
export default roomComponent;
