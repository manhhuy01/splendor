import Image from 'next/image';

const tokenComponent = ({ token, onClickToken }) => (
  <div className="token-container">
    {
      Object.keys(token).reduce((agg, color) => {
        if (!token[color]) return agg;
        return [...agg, (
          <div key={color} className="token">
            <div className="token__number">{token[color]}</div>
            <Image src={`/${color}.png`} width="50" height="50" onClick={onClickToken} />
          </div>
        )];
      }, [])
    }
  </div>
);
export default tokenComponent;
