import { useState } from 'react'
import type { Piece, Column as ColumnType } from './types'
import { Column } from './Column'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

const COLUMNS: ColumnType[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    // { id: 4 },
    // { id: 5 },
    // { id: 6 },
    // { id: 7 },
    // { id: 8 },
    // { id: 9 },
    // { id: 10 },
    // { id: 11 },
    // { id: 12 },
    // { id: 13 },
    // { id: 14 },
    // { id: 15 },
    // { id: 16 },
    // { id: 17 },
    // { id: 18 },
    // { id: 19 },
    // { id: 20 },
    // { id: 21 },
    // { id: 22 },
    // { id: 23 },
    // { id: 24 },
]

const INITIAL_BOARD_POSITION: Piece[] = [
    {
        id: 1,
        status: 1,
    },
    {
        id: 2,
        status: 1,
    },
    {
        id: 3,
        status: 2,
    },
    {
        id: 4,
        status: 3,
    },
]
export default function App() {
    const [pieces, setPieces] = useState<Piece[]>(INITIAL_BOARD_POSITION)

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) return

        const pieceId = active.id as number
        const newStatus = over.id as Piece['status']
        const piece = pieces.find((piece) => piece.id === pieceId)
        console.log(`Moving From ${piece?.status} to ${newStatus}`)
        setPieces(() => pieces.map((piece) => (piece.id === pieceId ? { ...piece, status: newStatus } : piece)))
    }

    return (
        <div className='p-4'>
            <div className='flex gap-8'>
                <DndContext onDragEnd={handleDragEnd}>
                    {COLUMNS.map((column) => {
                        return <Column key={column.id} column={column} pieces={pieces.filter((piece) => piece.status === column.id)} />
                    })}
                </DndContext>
            </div>
        </div>
    )
}
