const tokenComponent = ({ token, onClickToken, selecting }) => (
  <div className={`token-container ${selecting ? 'selecting' : ''}`}>
    {
      Object.keys(token).reduce((agg, color) => {
        if (!token[color]) return agg;
        return [...agg, (
          <div key={color} className="token">
            <div className="token__number">{token[color]}</div>
            <img src={`/${color}.png`} onClick={() => onClickToken && onClickToken(color)} />
          </div>
        )];
      }, [])
    }
  </div>
);
export default tokenComponent;
