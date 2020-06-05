import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: .25
  };

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }

    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn); // will push true or false
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLipping", coord);
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number); // take coords and turn them into nums and assign to their respective y and x value

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x]; // value is true, then set to false and vice versa
      }
    }

    // TODO: flip this cell and the cells around it

    flipCell(y, x);
    flipCell(y, x - 1); // flip left
    flipCell(y, x + 1); // flip right
    flipCell(y - 1, x); // flip below
    flipCell(y + 1, x); // flip above

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell)) // for each cell in every row on the board, check if all cells are equal to false and assign result to hasWon
    this.setState({ board, hasWon });
  }

  getCell = (row, rowInd) => row.map((cell, cellInd) => (
      <Cell 
        key={`${rowInd}-${cellInd}`}
        coord={`${rowInd}-${cellInd}`}
        isLit={cell}
        flipCellsAroundMe={this.flipCellsAround}
      />
     )
    ); 

   makeTable = () => this.state.board.map((row, rowInd) => {
      return (
          <tr key={rowInd}>
            {this.getCell(row, rowInd)}
          </tr>
      )
    });

  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
   return ( 
   <div>
   {this.state.hasWon ? ( 
    <div className="Board-title">
      <div className="winner">
        <span className="neon-orange">YOU</span>
        <span className="neon-blue">WIN!</span>
      </div>
      </div>
      ) : (
      <div>
       <div className="Board-title">
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Out</div>
       </div>
        <table className="Board">
          <tbody>
            {this.makeTable()}
          </tbody>
        </table>
      </div> 
      )}
     </div> 
   )}
}


export default Board;
