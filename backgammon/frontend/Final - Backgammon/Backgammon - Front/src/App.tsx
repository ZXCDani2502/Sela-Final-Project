import { useState } from 'react'
import type { Piece, Column as ColumnType } from './types'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Board from './components/board and pieces/Board'

const COLUMNS: ColumnType[] = [...Array(24)].map((_, i) => ({ id: 1 + i } as ColumnType))

const INITIAL_BOARD_POSITION: Piece[] = [
    {
        id: 1,
        position: 1,
        color: 'w',
    },
    {
        id: 2,
        position: 1,
        color: 'w',
    },
    {
        id: 3,
        position: 6,
        color: 'b',
    },
    {
        id: 4,
        position: 6,
        color: 'b',
    },
    {
        id: 5,
        position: 6,
        color: 'b',
    },
    {
        id: 6,
        position: 6,
        color: 'b',
    },
    {
        id: 7,
        position: 6,
        color: 'b',
    },
    {
        id: 8,
        position: 8,
        color: 'b',
    },
    {
        id: 9,
        position: 8,
        color: 'b',
    },
    {
        id: 10,
        position: 8,
        color: 'b',
    },
    {
        id: 11,
        position: 12,
        color: 'w',
    },
    {
        id: 12,
        position: 12,
        color: 'w',
    },
    {
        id: 13,
        position: 12,
        color: 'w',
    },
    {
        id: 14,
        position: 12,
        color: 'w',
    },
    {
        id: 15,
        position: 12,
        color: 'w',
    },
    {
        id: 16,
        position: 13,
        color: 'b',
    },
    {
        id: 17,
        position: 13,
        color: 'b',
    },
    {
        id: 18,
        position: 13,
        color: 'b',
    },
    {
        id: 19,
        position: 13,
        color: 'b',
    },
    {
        id: 20,
        position: 13,
        color: 'b',
    },
    {
        id: 21,
        position: 17,
        color: 'w',
    },
    {
        id: 22,
        position: 17,
        color: 'w',
    },
    {
        id: 23,
        position: 17,
        color: 'w',
    },
    {
        id: 24,
        position: 19,
        color: 'w',
    },
    {
        id: 25,
        position: 19,
        color: 'w',
    },
    {
        id: 26,
        position: 19,
        color: 'w',
    },
    {
        id: 27,
        position: 19,
        color: 'w',
    },
    {
        id: 28,
        position: 19,
        color: 'w',
    },
    {
        id: 29,
        position: 24,
        color: 'b',
    },
    {
        id: 30,
        position: 24,
        color: 'b',
    },
]
export default function App() {
    const [pieces, setPieces] = useState<Piece[]>(INITIAL_BOARD_POSITION)

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) return

        const pieceId = active.id as number
        const newPosition = over.id as Piece['position']
        const piece = pieces.find((piece) => piece.id === pieceId)

        console.log(`Moving From ${piece?.position} to ${newPosition}`)

        setPieces(() => pieces.map((piece) => (piece.id === pieceId ? { ...piece, position: newPosition } : piece)))
    }

    //TODO move to a new file

    return (
        <div className=''>
            <div className='flex'>
                <DndContext onDragEnd={handleDragEnd}>
                    <Board columns={COLUMNS} pieces={pieces} />
                </DndContext>
            </div>
        </div>
    )
}
