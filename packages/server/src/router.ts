import {
  Board,
  GameStatus,
  Marker,
  _,
} from '@mapistry/take-home-challenge-shared';
import { Router } from 'express';
import { GameService } from './gameService'; 

export const router = Router();

const game = new GameService();

interface MoveBody {
  board: Board;
}

router.post<'/begin', never, GameStatus>('/begin', (req, res) => {
  /**
   * FIXME: Delete this function body and complete it correctly instead.
   * You do not need to use the arguments provided, but that
   * is how the other code and tests call it
   */
  const gameStatus = {
    board: [Marker.x, _, _, _, _, _, _, _, _],
    winner: null,
  };
  res.json(gameStatus);
});

router.post<'/move', never, GameStatus | unknown, MoveBody>('/move', (req, res) => {
  const { board } = req.body;

  try {
    const newBoard = game.getBestMove(board);
    const gameStatus = game.getGameStatus(newBoard.board); 
    res.json(gameStatus);
  }
  catch(e) {
    // eslint-disable-next-line no-console
    console.log(e); // TODO - add logging
    res.json(e);
  }
});
