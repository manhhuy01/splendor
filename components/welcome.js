import { useRef } from 'react';

const welcome = ({ rooms, joinRoom }) => {
  const inputRef = useRef(null);
  return (
    <div>
      <h1 className="title">
        Welcome to Splendor
      </h1>
      <div>
        Tên:
        <input ref={inputRef} />
      </div>
      {
        rooms.map((room) => (
          <div key={room.id}>
            <div>
              {`phòng ${room.id} (${room.players.length})`}
            </div>
            <button type="button" onClick={() => joinRoom(room.id, inputRef.current.value)}>vô</button>
          </div>
        ))
      }
    </div>
  );
};

export default welcome;
