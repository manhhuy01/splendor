import { useState } from 'react';
import { Button, Input } from 'antd';

const welcome = ({ rooms, joinRoom, reset }) => {
  const [value, setValue] = useState('');
  return (
    <div className="welcome">
      <h1 className="title">
        Welcome to Splendor
      </h1>
      <div>
        <Input size="large" placeholder="Tên" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      {
        rooms.map((room) => (
          <div key={room.id} className="room">
            <div>
              {`phòng ${room.id} (${room.players.length})`}
            </div>
            <Button type="primary" onClick={() => joinRoom(room.id, value)}>Vào phòng</Button>
            <Button danger type="text" onClick={() => reset(room.id)}>Reset Game </Button>

          </div>
        ))
      }
    </div>
  );
};

export default welcome;
