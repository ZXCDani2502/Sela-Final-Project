import { useState } from 'react'
import type { Piece, Column as ColumnType } from '../types.ts'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Board from '../components/backgammon/Board.tsx'
import DiceRoll from '../components/backgammon/Dice.tsx'
import axios from 'axios'
import { getDice } from '../utils/getDice'
const COLUMNS: ColumnType[] = [...Array(24)].map((_, i) => ({ id: i } as ColumnType))

const INITIAL_BOARD_POSITION: Piece[] = [
    {
        id: 1,
        position: 0,
        color: 'w',
    },
    {
        id: 2,
        position: 0,
        color: 'w',
    },
    {
        id: 3,
        position: 5,
        color: 'b',
    },
    {
        id: 4,
        position: 5,
        color: 'b',
    },
    {
        id: 5,
        position: 5,
        color: 'b',
    },
    {
        id: 6,
        position: 5,
        color: 'b',
    },
    {
        id: 7,
        position: 5,
        color: 'b',
    },
    {
        id: 8,
        position: 7,
        color: 'b',
    },
    {
        id: 9,
        position: 7,
        color: 'b',
    },
    {
        id: 10,
        position: 7,
        color: 'b',
    },
    {
        id: 11,
        position: 11,
        color: 'w',
    },
    {
        id: 12,
        position: 11,
        color: 'w',
    },
    {
        id: 13,
        position: 11,
        color: 'w',
    },
    {
        id: 14,
        position: 11,
        color: 'w',
    },
    {
        id: 15,
        position: 11,
        color: 'w',
    },
    {
        id: 16,
        position: 12,
        color: 'b',
    },
    {
        id: 17,
        position: 12,
        color: 'b',
    },
    {
        id: 18,
        position: 12,
        color: 'b',
    },
    {
        id: 19,
        position: 12,
        color: 'b',
    },
    {
        id: 20,
        position: 12,
        color: 'b',
    },
    {
        id: 21,
        position: 16,
        color: 'w',
    },
    {
        id: 22,
        position: 16,
        color: 'w',
    },
    {
        id: 23,
        position: 16,
        color: 'w',
    },
    {
        id: 24,
        position: 18,
        color: 'w',
    },
    {
        id: 25,
        position: 18,
        color: 'w',
    },
    {
        id: 26,
        position: 18,
        color: 'w',
    },
    {
        id: 27,
        position: 18,
        color: 'w',
    },
    {
        id: 28,
        position: 18,
        color: 'w',
    },
    {
        id: 29,
        position: 23,
        color: 'b',
    },
    {
        id: 30,
        position: 23,
        color: 'b',
    },
]

const BackgammonPage = () => {
    const [pieces, setPieces] = useState<Piece[]>(INITIAL_BOARD_POSITION)

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) return

        const pieceId = active.id as number
        const newPosition = over.id as Piece['position']
        const piece = pieces.find((piece) => piece.id === pieceId)

        console.log(`Moving From ${piece?.position} to ${newPosition}`)
        axios
            .post('https://localhost:6500/turn', {
                LastPosition: piece?.position,
                FuturePosition: newPosition,
            })
            .then((res) => {
                if (res) {
                    setPieces(() => pieces.map((piece) => (piece.id === pieceId ? { ...piece, position: newPosition } : piece)))
                    getDice()
                }
            })
    }

    //TODO move to a new file

    return (
        <div className='flex'>
            <DndContext onDragEnd={handleDragEnd}>
                <Board columns={COLUMNS} pieces={pieces} />
            </DndContext>
            <DiceRoll />
        </div>
    )
}

export default BackgammonPage
