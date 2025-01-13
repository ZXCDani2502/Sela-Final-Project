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
            <div className='flex w-80 flex-col bg-amber-800 p-4'>
                <div ref={setNodeRef} className='flex flex-1 flex-col top-0 w-0 h-0 border-l-transparent border-r-[25px] border-r-transparent border-t-[200px]'>
                    {pieces.map((piece) => {
                        return <Piece key={piece.id} piece={piece} />
                    })}
                </div>
            </div>
    )
}
