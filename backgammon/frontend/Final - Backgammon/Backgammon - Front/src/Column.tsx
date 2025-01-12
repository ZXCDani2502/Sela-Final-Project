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
        <>
            {column.color === 'b' ? (
                <div className='flex w-80 flex-col rounded-lg bg-neutral-800 p-4'>
                    <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
                        {pieces.map((piece) => {
                            return <Piece key={piece.id} piece={piece} />
                        })}
                    </div>
                </div>
            ) : (
                <div className='flex w-80 flex-col rounded-lg bg-neutral-800 p-4'>
                    <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
                        {pieces.map((piece) => {
                            return <Piece key={piece.id} piece={piece} />
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
