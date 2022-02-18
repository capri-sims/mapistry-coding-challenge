import {
  Board,
  Difficulty,
  GameStatus,
  Player,
} from '@mapistry/take-home-challenge-shared';

export const begin = async ( // QUESTION - Why is there a separate begin function ??
  difficulty: Difficulty,
  whoIsFirst: Player,
): Promise<GameStatus> => {
  const response = await fetch('/api/begin', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ difficulty, whoIsFirst }),
  });

  const status: GameStatus = await response.json();
  return status;
};

export const move = async (
  board: Board,
  difficulty: Difficulty, // QUESTION - What is the purpose of difficulty if the game is unbeatable? 
): Promise<GameStatus> => {
  const response = await fetch('/api/move', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ board, difficulty }),
  });

  const status: GameStatus = await response.json();
  return status;
};
