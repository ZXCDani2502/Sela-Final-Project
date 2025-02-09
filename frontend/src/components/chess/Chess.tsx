import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { CustomSquareStyles, PromotionPieceOption } from 'react-chessboard/dist/chessboard/types'
import { useLocation } from 'react-router'
import { useSocketContext } from '../../context/SocketContext.tsx'
import useChessPlayer from '../../hooks/chess/useChessPlayer.ts'
const Game = () => {
    const [game, setGame] = useState<Chess>(new Chess())
    const [moveFrom, setMoveFrom] = useState<Square | null>(null)
    const [moveTo, setMoveTo] = useState<Square | null>(null)
    const [optionSquares, setOptionSquares] = useState<CustomSquareStyles | undefined>({})
    const [showPromotionDialog, setShowPromotionDialog] = useState(false)
    const { socket } = useSocketContext()

    const location = useLocation()
    const { color } = location.state
    const player = useChessPlayer(color)

    //OPTIONAL hot toast for invalid moves

    // for external actions

    // const safeGameMutate = (modify: Function) => {
    //   setGame(g => {
    //     const gameCopy = new Chess(g.fen())
    //     modify(gameCopy)
    //     return gameCopy
    //   })
    // }

    const safeMove = (from?: Square | null, to?: Square | null, promotion?: string) => {
        const gameCopy: Chess = new Chess(game.fen())

        if (!from || !to) return null
        const move = gameCopy.move({ from, to, promotion })
        if (!move) return null
        return { gameCopy: gameCopy, move: move }
    }

    const resetStates = (resetOptionSquares = true) => {
        setMoveFrom(null)
        setMoveTo(null)
        setShowPromotionDialog(false)
        if (resetOptionSquares) setOptionSquares({})
    }

    const onSquareClick = (square: Square) => {
        // setRightClickedSquares({})

        // select first square
        if (!moveFrom) {
            // can't select other color to move
            if (game.get(square)?.color !== player!.color) return

            const hasMoveOptions = getMoveOptions(square)
            if (hasMoveOptions) setMoveFrom(square)
            return
        }

        // select second square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({ square: moveFrom, verbose: true })
            const foundMove = moves.find((m) => m.from === moveFrom && m.to === square)

            // not a valid move
            if (!foundMove) {
                const hasMoveOptions = getMoveOptions(square) // check if clicked on new piece
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : null)
                return
            }

            // valid move
            setMoveTo(square)

            // if promotion move
            if (onPromotionCheck(moveFrom, square)) {
                setShowPromotionDialog(true)
            }

            // is normal move
            const result = safeMove(moveFrom, square)

            // if invalid, reset move options to the newly clicked piece
            if (!result) {
                const hasMoveOptions = getMoveOptions(square)
                if (hasMoveOptions) setMoveFrom(square)
                return
            }
            const { gameCopy } = result

            socket?.emit('move', gameCopy.fen())
            setGame(gameCopy)
            resetStates()
            return
        }
    }
    useEffect(() => {
        if (!socket) return

        const handleMoveSet = (fen: string) => {
            try {
                const gameCopy = new Chess(game.fen())
                gameCopy.load(fen)
                setGame(gameCopy)
            } catch (e) {
                console.log(e)
            }
            resetStates()
        }

        socket.on('moveSet', handleMoveSet)

        return () => {
            socket.off('moveSet', handleMoveSet)
        }
    }, [socket, game])
    const getMoveOptions = (square: Square) => {
        const moves = game.moves({ square, verbose: true })

        if (moves.length === 0) {
            setOptionSquares({})
            return false
        }

        // markings for available moves
        const newSquares: CustomSquareStyles | undefined = {}
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) && game.get(move.to)?.color !== game.get(square)?.color
                        ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                borderRadius: '50%',
            }
            return move
        })
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)',
        }

        setOptionSquares(newSquares)
        return true
    }

    const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
        //can't drop the enemy pieces
        if (game.get(sourceSquare)?.color !== player!.color) return false

        setMoveFrom(sourceSquare)
        setMoveTo(targetSquare)

        const result = safeMove(sourceSquare, targetSquare)

        if (result) {
            socket?.emit('move', result.gameCopy.fen())
            setGame(result.gameCopy)
            resetStates()
            return true
        }
        return false
    }

    const onPromotionPieceSelect = (piece?: PromotionPieceOption, promoteFromSquare?: Square, promoteToSquare?: Square) => {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
            if (promoteFromSquare === null || promoteToSquare === null) return false

            if (promoteFromSquare === undefined) promoteFromSquare = moveFrom! //helper for promotion from onSquareClick

            const result = safeMove(promoteFromSquare, promoteToSquare, piece[1].toLowerCase())
            if (!result) return false

            console.log(`promoted to ${piece}`)

            socket!.emit('move', result.gameCopy.fen())
            setGame(result.gameCopy)
        }
        resetStates()
        return true
    }

    const onPromotionCheck = (from: Square, to: Square) => {
        const moves = game.moves({ square: from, verbose: true })
        const foundMove = moves.find((m) => m.from === from && m.to === to)
        if (foundMove && foundMove!.piece === 'p' && ((foundMove!.color === 'w' && to[1] === '8') || (foundMove!.color === 'b' && to[1] === '1'))) {
            return true
        }
        return false
    }

    return (
        <div className=''>
            <Chessboard
                boardWidth={600}
                position={game.fen()}
                animationDuration={200}
                customSquareStyles={{ ...optionSquares }}
                onSquareClick={onSquareClick}
                onPromotionPieceSelect={onPromotionPieceSelect}
                onPieceDrop={onPieceDrop}
                showPromotionDialog={showPromotionDialog}
                promotionToSquare={moveTo}
                boardOrientation={player!.color === 'w' ? 'white' : 'black'}
                onPromotionCheck={onPromotionCheck}
            />
            {/*
      <button className='btn' onClick={() => {
        safeGameMutate((game: Chess) => {
          console.log(game.history({verbose: true}))
          game.reset()
        })
        resetStates()
      }}>
        Reset
      </button>

      <button className='btn' onClick={() => {
        safeGameMutate((game: Chess) => {
          const move = game.undo()
          console.log(move)
        })
        resetStates()
      }}>
        Undo
      </button>
      */}
        </div>
    )
}

export default Game
