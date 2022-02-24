/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from "./Square.jsx";
import { move } from "../../api";

// TODO - convert to TypeScript 
// FUTURE - save state in cookies?

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(''),
      usersTurn: true,
      winner: null
    };
  }

  handleClick(i) {
    const { squares } = this.state; 

    if(squares[i] !== '') return; // ensures user can't change existing value

    let newSquares = squares.slice(); // creates a copy
    newSquares[i] = 'x'; // FUTURE - allow user to choose to use X or O ? 

    this.setState({
      squares: newSquares,
      usersTurn: false
    });

    newSquares = newSquares.map((val => val || null )); // ensures the board matches the Board type

    move(newSquares, null)
      .then((response) => {
        const { board, winner } = response; 
        const newBoard = board.map((val => val || '' ));

        this.setState({
          squares: newBoard,
          usersTurn: true,
          winner
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error); 
        // TODO - display error to user? Restart game? 
        // TODO - add logging
      });
  }

  // TODO - allow keyboard users to tab and select button with enter
  renderSquare(i) {
    const { squares, usersTurn, winner } = this.state; 
    return (
      <Square 
        value={squares[i].toUpperCase()} 
        onClick={() => this.handleClick(i)}
        disabled={!!winner || !usersTurn}
      />
    );
  }

  // FIXME - when api returns quickly user may see the status message flicker - add a timeout or progress bar/spinner ? 
  // TODO - allow user to choose who goes first
  // TODO - highlight winning line
  // TODO - create reset button
  render() {
    const { usersTurn, winner } = this.state; 
    
    let status = usersTurn ? "Your turn!" : "Computer is thinking..."; // FUTURE - generate random message for computer's turn
    if (winner) {
      status = winner === 'tie' ? "It's a tie!" : "Computer Wins!";
    }

    return (
      <div>
        <div className="status">{status}</div> 
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
};

  