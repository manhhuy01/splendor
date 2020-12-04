const Room = ({ rooms, joinRoom }) => (
  <div>
    {
      rooms.map((room) => (
        <div key={room.id}>
          <div>
            {`phòng ${room.id} (${room.players.length})`}
          </div>
          <button type="button" disabled={room.isFull} onClick={() => joinRoom(room.id)}>vô</button>
        </div>
      ))
    }
  </div>
);

export default Room;
