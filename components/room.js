import { Button } from 'antd';

const roomComponent = ({ room, player: { name }, start }) => (
  <div className="welcome">
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
    <Button type="primary" onClick={() => start(2)}>Start 2 player</Button>
    <Button type="primary" onClick={() => start(3)}>Start 3 player</Button>
    <Button type="primary" onClick={() => start(4)}>Start 4 player</Button>

  </div>
);
export default roomComponent;
