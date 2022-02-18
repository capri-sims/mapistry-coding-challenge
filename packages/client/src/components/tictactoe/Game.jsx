/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { GameBoard } from "./GameBoard.jsx";
import '../../styles/tictactoe.css';

// TODO - convert to TypeScript 

export const Game = () => (
    <div>
        <h1>Tic Tac Toe</h1>
        <div className="game">
            <div className="game-board">
                <GameBoard />
            </div>
        </div>
    </div>
);
