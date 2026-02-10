import { useEffect, useState, useContext } from 'react';
import Profile from './profile';
import Chat from './chat';
import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards';
import Congratulation from './congratulation';
import { ActionContext } from '../utils/context';
import Instructions from './instructions';
import { post } from '../utils/requets';

const gameComponent = ({
  socket, game, room, messages, send,
}) => {
  const getPlayer = (turn) => room.players.find((x) => x.turn === turn);
  const currentUser = room.players.find((x) => x.socketId === socket.id);

  // if not currentUser
  if (!currentUser) {
    return null;
  }

  const [winners, setWinners] = useState([]);
  const countdownValue = game.countdown || room.countdown || 0;
  const [timeLeft, setTimeLeft] = useState(countdownValue);
  const { state } = useContext(ActionContext);

  const isMyTurn = game.currentTurn === currentUser.turn;

  useEffect(() => {
    if (countdownValue > 0) {
      setTimeLeft(countdownValue);
    }
  }, [game.currentTurn, countdownValue]);

  useEffect(() => {
    let interval;
    if (countdownValue > 0 && timeLeft > 0 && !game.finished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (countdownValue > 0 && timeLeft === 0 && isMyTurn && !game.finished) {
      post('throw_turn', { roomId: room.id, socketId: socket.id });
    }
    return () => clearInterval(interval);
  }, [timeLeft, countdownValue, isMyTurn, game.finished, room.id, socket.id]);

  useEffect(() => {
    if (game.finished && game.winners) {
      const winnerData = game.winners.map((turn) => {
        const playerInfo = room.players.find((p) => +p.turn === +turn);
        const gameState = state.room.game.players[turn];
        return {
          name: playerInfo?.name || `Player ${turn}`,
          score: gameState?.pv || 0,
          turn,
        };
      }).sort((a, b) => b.score - a.score);
      setWinners(winnerData);
    }
  }, [game.finished, game.winners, room.players, state.room.game.players]);

  let arrIndex = [1, 2, 3, 4];
  arrIndex = arrIndex.slice(currentUser.turn, 4)
    .concat(arrIndex.slice(0, currentUser.turn - 1));

  return (
    <div className="game">
      {countdownValue > 0 && !game.finished && (
        <div className={`game-timer ${timeLeft <= 5 ? 'warning' : ''}`} style={{ zIndex: 9999 }}>
          <span className="timer-icon">{timeLeft <= 5 ? '⚠️' : '⏳'}</span>
          <span className="timer-value">{timeLeft}s</span>
        </div>
      )}
      <div className="game__left">
        {
          arrIndex.map((turn) => (
            <Profile
              key={turn}
              player={state.room.game.players[turn]}
              user={getPlayer(turn)}
              currentTurn={game.currentTurn}
              hidden={currentUser.turn !== turn}
            />
          ))
        }
        <Instructions />
      </div>
      <div className="game__center">
        <div className="table-game">
          <CardComponent card_table={game.table.card_table} />
          <TokenComponent token={state.room.game.table.token} />
          <DukeComponent dukes={game.table.dukes} />
        </div>
        <div className="game__bottom">
          <Profile
            player={state.room.game.players[currentUser.turn]}
            user={getPlayer(currentUser.turn)}
            currentTurn={game.currentTurn}
            isCurrentPlayer
            socket={socket}
            room={room}
          />
          <Chat
            messages={messages}
            send={send}
            socketId={socket.id}
          />
        </div>
      </div>
      {
        game.finished && <Congratulation names={winners} />
      }
    </div>
  );
};

export default gameComponent;
