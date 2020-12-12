import TokenProfile from './tokenProfile'

const profileComponent = ({ player, user, currentTurn }) => {
  if (!player || !user) return null;
  const isMyTurn = user.turn === currentTurn;
  return (
    <div className={`profile ${isMyTurn ? 'my-turn' : ''} `} >
      <div className="profile__name">{user.name}</div>
      <div className="profile__game">
        <div className="profile__game__deposit"></div>
        <div className="profile__game__token-cards">
          <div className="profile__game__token">
            <TokenProfile token={player.token} />
          </div>
          <div className="profile_game__cards">

          </div>
        </div>
      </div>
    </div >
  )
}
export default profileComponent;