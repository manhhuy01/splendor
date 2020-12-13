import { useContext } from 'react';
import { ActionContext } from '../utils/context';

const tokenComponent = ({ token }) => {
  const { state, dispatch } = useContext(ActionContext);
  const isCollect = state.actionType === 'collect_token';

  const collectToken = (color) => () => {
    if (!isCollect) return;
    dispatch({ type: 'collect_token', color });
  };
  return (
    <div className="token-container">
      <div className={`token-normal ${isCollect ? 'selecting' : ''}`}>
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
      <div className="token-gold">
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
