import constants from '../constants';

const tokenComponent = ({ token, onClickToken }) => (
  <div className="token-container">
    {
      constants.color.reduce((agg, color) => [...agg, (
        <div key={color} className="token">
          {
            !!token[color] && <div className="token__number">{token[color]}</div>
          }
          {
            !!token[color] && <img src={`/${color}.png`} onClick={() => onClickToken && onClickToken(color)} />
          }

        </div>
      )], [])
    }
  </div>
);
export default tokenComponent;
