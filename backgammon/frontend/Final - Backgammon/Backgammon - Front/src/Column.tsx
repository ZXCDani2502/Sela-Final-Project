import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType, Piece as PieceType } from './types'
import Piece from './components/board and pieces/Piece'

type ColumnProps = {
    column: ColumnType
    pieces: PieceType[]
}

export function Column({ column, pieces }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })
    return (
        <div key={column.id} className='w-1/6 h-full relative'>
            <div
                ref={setNodeRef}
                className={`absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px]
                ${column.id % 2 === 1 ? 'border-t-amber-700' : 'border-t-amber-300'} opacity-25`}>
                {pieces.map((piece) => {
                    return <Piece key={piece.id} piece={piece} />
                })}
            </div>
        </div>
    )
}
