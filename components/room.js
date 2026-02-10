import { Button, InputNumber } from 'antd';
import { useState } from 'react';

const roomComponent = ({ room, player: { name }, start }) => {
  const [countdown, setCountdown] = useState(30);

  return (
    <div className="welcome">
      <div className="welcome-input-container" style={{ maxWidth: '600px' }}>
        <h1 className="room-id" style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '20px' }}>
          ĐANG ĐỢI TRONG PHÒNG #{room.id}
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div className="room-info" style={{ gap: '4px' }}>
            <span className="room-id">Thông tin người chơi</span>
            <span className="room-name" style={{ fontSize: '1.2rem' }}>{name} (Bạn)</span>
            <div className="room-players" style={{ marginTop: '10px' }}>
              <span style={{ color: 'var(--text-primary)' }}>Hiện có: </span>
              <span style={{ fontWeight: 600 }}>{room.players.map((x) => x.name).join(', ')}</span>
            </div>
          </div>

          <div className="room-info" style={{ gap: '4px' }}>
            <span className="room-id">Cấu hình trận đấu</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Thời gian mỗi lượt (giây)</span>
              <InputNumber 
                min={0} 
                max={300} 
                value={countdown} 
                onChange={setCountdown} 
                style={{ width: '100%', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Để trống hoặc 0 để không giới hạn</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem' }}>
            BẮT ĐẦU TRẬN ĐẤU VỚI
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[2, 3, 4].map((num) => (
              <Button 
                key={num}
                type="primary" 
                onClick={() => start(num, countdown)}
                style={{ 
                  flex: 1, 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, var(--accent-gold), #b38f00)',
                  borderColor: 'transparent',
                  fontWeight: 700,
                  color: 'var(--bg-dark)'
                }}
              >
                {num} NGƯỜI
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default roomComponent;
