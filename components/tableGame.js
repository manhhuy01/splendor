import DukeComponent from './duke';
import TokenComponent from './token';
import CardComponent from './cards'

const tableGame = ({ table }) => {
  console.log(table)
  return (
    <div className="table-game">
      <DukeComponent duke_table={table.duke_table} />
      <CardComponent card_table={table.card_table} />
      <TokenComponent token={table.token} />
    </div>
  )
}
export default tableGame;