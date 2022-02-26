/* eslint-disable class-methods-use-this */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import {
    Board,
    GameStatus,
    Marker,
    _,
    WinningLine
} from '@mapistry/take-home-challenge-shared';

interface WinningLines {
    line: WinningLine,
    indices: number[]
}

interface Move {
    val: number,
    board: Board
}

export class GameService {
    // FUTURE - add alpha beta pruning - or cache best moves 
    // NOTE - depth is used to find the quickest win
    getBestMove(board: Board, maximizing = true, depth = 0) : Move {
        const bestMove : Move = { 
            val:  maximizing ? -101 : 99,
            board
        }; 
        
        const winnerStatus = this.getGameStatus(board); 
        const theWinner = winnerStatus.winner; 
        if(theWinner) {
            if(theWinner === Marker.x) bestMove.val = -100 + depth; 
            else if(theWinner === Marker.o) bestMove.val = 100 - depth; // O is currently the computer and always the maximizer 
            else bestMove.val = 0; 
            return bestMove; 
        }

        const possibileMoves: Board[] = this.generatePossiblities(board, maximizing); 
        possibileMoves.forEach(game => {
            const { val } = this.getBestMove(game, !maximizing, depth + 1); 
            let replaceBest = false; 

            if(maximizing) {
                if (val > bestMove.val) replaceBest = true;
            } 
            else if (val < bestMove.val) replaceBest = true;

            if(replaceBest) {
                bestMove.val = val;
                bestMove.board = game; 
            }

        });

        return bestMove;
    }

    private generatePossiblities(board: Board, maximizing: boolean) : Board[] {
        const possibilities: Board[] = [];

        board.forEach((cell, i) => {
            if(cell === _) {
                const newBoard = [...board];
                newBoard[i] = maximizing ? Marker.o : Marker.x; 
                possibilities.push(newBoard); 
            }
        });
        return possibilities; 
    }

    getGameStatus(board: Board) : GameStatus {
        const winningLines: WinningLines[] = this.getWinningLines();
        const gameStatus : GameStatus = {
            board,
            winner: null,
        };

        for (let i = 0; i < winningLines.length; i++) {
          const [a, b, c] = winningLines[i].indices;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameStatus.winner = board[a];
            gameStatus.winningLine = winningLines[i].line; 
            break; 
          }
        }

        if(!gameStatus.winner && !board.includes(_)) {
            gameStatus.winner = 'tie';
        }

        return gameStatus;
    }

    private getWinningLines() : WinningLines[] {
        return [
            {line : {row: 0}, indices: [0, 1, 2]},
            {line : {row: 1}, indices: [3, 4, 5]},
            {line : {row: 2}, indices: [6, 7, 8]},
            {line : {column: 0}, indices: [0, 3, 6]},
            {line : {column: 1}, indices: [1, 4, 7]},
            {line : {column: 2}, indices: [2, 5, 8]},
            {line : {diagonal: 0}, indices: [0, 4, 8]},
            {line : {diagonal: 1}, indices: [2, 4, 6]},
        ];
    }

}


