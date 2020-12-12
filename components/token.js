import { useContext } from 'react';
import Image from 'next/image';
import { ActionContext } from '../utils/context';

const tokenComponent = ({ token }) => {
  const { state, dispatch } = useContext(ActionContext);
  const isCollect = state.actionType === 'collect_token';

  const collectToken = (color) => () => {
    if (!isCollect) return;
    dispatch({ type: 'collect', color });
  };
  return (
    <div className="token-container">
      <div className={`token-normal ${isCollect ? 'collecting' : ''}`}>
        {
          Object.keys(token).reduce((agg, color) => {
            if (!token[color] || color === 'gold') return agg;
            return [...agg, (
              <div key={color} className="token">
                <div className="token__number">{token[color]}</div>
                <Image src={`/${color}.png`} width="50" height="50" onClick={collectToken(color)} />
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
                <Image src={`/${color}.png`} width="50" height="50" />
              </div>
            )];
          }, [])
        }
      </div>

    </div>
  );
};
export default tokenComponent;
