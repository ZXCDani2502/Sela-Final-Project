import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Move, Chess, Square, Piece } from "chess.js"

const Game = () => {
    const [game, setGame] = useState<Chess>(new Chess())

    const makeAMove = (move: Move) => {
        const gameCopy: Chess = new Chess(game.fen());
        const result = gameCopy.move(move);
        if (result) setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
      }

    const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
        const move = makeAMove({
          from: sourceSquare,
          to: targetSquare,
          piece: piece.type,
          color: piece.color,
          

        });
    
        // illegal move
        return move ? true : false
    }

  return (
    <div>
        <Chessboard position={game.fen()} onPieceDrop={onDrop}/>
    </div>
  )
}

export default Game