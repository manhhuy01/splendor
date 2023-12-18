import { useContext } from 'react';
import { ActionContext } from '../utils/context';

const tokenComponent = ({ token }) => {
  const { state, dispatch } = useContext(ActionContext);

  const player = state.room.players.find((x) => x.socketId === state.socket.id);
  if (!player) return null;
  const isMyTurn = state.room.game.currentTurn === player.turn;

  const collectToken = (color) => () => {
    if (isMyTurn) {
      dispatch({ type: 'collect_token', color });
    }
  };
  return (
    <div className="token-container token--column">
      <div className="token-normal">
        {
          Object.keys(token).reduce((agg, color) => {
            if (!token[color] || color === 'gold') return agg;
            return [...agg, (
              <div key={color} className="token">
                <div className="token__number">{token[color]}</div>
                <img src={`/${color}.png`} onClick={collectToken(color)} />
              </div>
            )];
          }, [])
        }
      </div>
      <div className="token-normal">
        {
          Object.keys(token).reduce((agg, color) => {
            if (!token[color] || color !== 'gold') return agg;
            return [...agg, (
              <div key={color} className="token">
                <div className="token__number">{token[color]}</div>
                <img src={`/${color}.png`} />
              </div>
            )];
          }, [])
        }
      </div>

    </div>
  );
};
export default tokenComponent;
