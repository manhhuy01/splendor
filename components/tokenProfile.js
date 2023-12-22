/* eslint-disable jsx-a11y/no-static-element-interactions */
import constants from '../constants';

const tokenComponent = ({ token, onClickToken }) => (
  <div className="token-container">
    {
      constants.color.reduce((agg, color) => [...agg, (
        token[color]
          ? (
            <div className={`token token--${color}`} onClick={() => onClickToken && onClickToken(color)}>
              <div className="token__number">
                {token[color]}
              </div>
            </div>
          ) : <div className="token empty" />
      )], [])
    }
  </div>
);
export default tokenComponent;
