import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Move, Chess, Square, Piece } from "chess.js"
import { CustomSquareStyles } from 'react-chessboard/dist/chessboard/types'

const Game = () => {
    const [game, setGame] = useState<Chess>(new Chess())
    const [moveFrom, setMoveFrom] = useState<Square|null>(null)
    const [moveTo, setMoveTo] = useState<Square|null>(null)
    const [optionSquares, setOptionSquares] = useState<CustomSquareStyles | undefined>({})

    const safeGameMutate = (modify: Function) => {
      setGame(g => {
        const gameCopy = new Chess(g.fen());
        modify(gameCopy)
        return gameCopy
      })
    }

    const getMoveOptions = (square: Square) => {
      const moves = game.moves({square, verbose: true})

      if (moves.length === 0) {
        setOptionSquares({})
        return false
      }

      const newSquares: CustomSquareStyles | undefined = {}
      moves.map(move => {
        newSquares[move.to] = {
          background: game.get(move.to) && game.get(move.to).color !== game.get(square).color ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
          borderRadius: "50%"
        }
        return move;
      })
      newSquares[square] = {
        background: "rgba(255, 255, 0, 0.4)"
      }

      setOptionSquares(newSquares)
      return true
    }

    const onSquareClick = (square: Square) => {
      // setRightClickedSquares({});
  
      // from square
      if (!moveFrom) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return
      }

      // to square
      if (!moveTo) {
      // check if valid move before showing dialog
      const moves = game.moves({
        square: moveFrom,
        verbose: true
      })
      const foundMove = moves.find(m => m.from === moveFrom && m.to === square)
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square)
        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : null)
        return
      }

      // valid move
      setMoveTo(square);

      // if promotion move
      if (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8" || foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1") {
        // setShowPromotionDialog(true);
        return;
      }

      // is normal move
      const gameCopy: Chess = new Chess(game.fen())
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: "q"
      });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }
      setGame(gameCopy);
      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }

  //TODO: make a function for making a move and replace all the duplicate code

  const onPromotionPieceSelect = (piece: Piece) => {
    // if no piece passed then user has cancelled dialog, don't make move and reset
    if (piece) {
      const gameCopy = {
        ...game
      };
      gameCopy.move({
        from: moveFrom,
        to: moveTo,
        promotion: piece[1].toLowerCase() ?? "q"
      });
      setGame(gameCopy);
      setTimeout(makeRandomMove, 300);
    }
    setMoveFrom("");
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

    // const makeAMove = (move: Move) => {
    //     const gameCopy: Chess = new Chess(game.fen());
    //     const result = gameCopy.move(move);
    //     if (result) setGame(gameCopy);
    //     return result; // null if the move was illegal, the move object if the move was legal
    // }

    // const onPieceDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    //     const move = makeAMove({
    //       from: sourceSquare,
    //       to: targetSquare,
    //       piece: piece.type,
    //       color: piece.color,
          

    //     });
    
    //     // illegal move
    //     return move ? true : false
    // }

  return (
    <div>
        <Chessboard position={game.fen()} customSquareStyles={{...optionSquares}} onSquareClick={onSquareClick}
        // onPieceDrop={onPieceDrop}
        />
    </div>
  )
}

export default Game