import { Button, Input } from 'antd';
import { useAtom } from 'jotai';
import { playerName } from '../atoms/action';

const welcome = ({ rooms, joinRoom, reset }) => {
  const [value, setValue] = useAtom(playerName);

  const resetClick = (room) => {
    if (confirm('Are you sure?') === true) {
      reset(room.id);
    }
  };
  return (
    <div className="welcome">
      <h1 className="title">
        Splendor
      </h1>
      <div style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
        <Input size="large" placeholder="Nhập tên của bạn..." value={value} onChange={(e) => setValue(e.target.value)} style={{ borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'var(--glass-border)' }} />
      </div>
      <div className="room-list">
        {
          rooms.map((room) => (
            <div key={room.id} className="room">
              <div className="room-info">
                {`Phòng ${room.id} • ${room.players.length} người`}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="large" type="primary" onClick={() => joinRoom(room.id, value)} style={{ borderRadius: '8px', background: 'var(--accent-gold)', borderColor: 'var(--accent-gold)', fontWeight: 600 }}>Vào</Button>
                <Button className="btn-reset" danger type="text" onClick={() => resetClick(room)} style={{ color: 'var(--red)' }}>Reset</Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  );
};

export default welcome;
