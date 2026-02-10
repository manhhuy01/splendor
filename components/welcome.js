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
      
      <div className="welcome-input-container">
        <div style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          NHẬP TÊN NGƯỜI CHƠI
        </div>
        <Input 
          size="large" 
          placeholder="Ví dụ: Hoàng Gia..." 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          style={{ 
            borderRadius: '12px', 
            background: 'rgba(0,0,0,0.3)', 
            color: 'white', 
            borderColor: 'var(--glass-border)',
            padding: '12px 16px',
            fontSize: '1.1rem'
          }} 
        />
      </div>

      <div className="room-list">
        {
          rooms.map((room) => (
            <div key={room.id} className="room">
              <div className="room-info">
                <span className="room-id">PHÒNG THI ĐẤU #{room.id}</span>
                <span className="room-name">Lâu Đài Cổ</span>
                <div className="room-players">
                  <span>👥</span>
                  <span>{room.players.length} Chiến binh đang đợi</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <Button 
                  size="large" 
                  type="primary" 
                  onClick={() => joinRoom(room.id, value)} 
                  disabled={!value}
                  style={{ 
                    borderRadius: '10px', 
                    background: 'var(--accent-gold)', 
                    borderColor: 'var(--accent-gold)', 
                    fontWeight: 700,
                    flex: 2,
                    height: '48px',
                    color: 'var(--bg-dark)'
                  }}
                >
                  THAM GIA NGAY
                </Button>
                <Button 
                  className="btn-reset" 
                  danger 
                  type="text" 
                  onClick={() => resetClick(room)} 
                  style={{ 
                    color: 'var(--red)',
                    flex: 1,
                    height: '48px',
                    fontWeight: 600,
                    background: 'rgba(196, 48, 43, 0.1)',
                    borderRadius: '10px'
                  }}
                >
                  LÀM MỚI
                </Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default welcome;
