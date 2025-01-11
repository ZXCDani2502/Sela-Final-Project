import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType, Piece } from './types'
import OnePiece from './components/board and pieces/BlackPiece'

type ColumnProps = {
    column: ColumnType
    pieces: Piece[]
}

export function Column({ column, pieces }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })
    return (
        <div className='flex w-80 flex-col rounded-lg bg-neutral-800 p-4'>
            <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
                {pieces.map((piece) => {
                    return <OnePiece key={piece.id} piece={piece} color='' />
                })}
            </div>
        </div>
    )
}
