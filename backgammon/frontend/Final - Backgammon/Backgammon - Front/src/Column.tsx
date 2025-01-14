import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType, Piece as PieceType, Quadrant } from './types'
import Piece from './components/board and pieces/Piece'

type ColumnProps = {
    column: ColumnType
    pieces: PieceType[]
    quadrant: Quadrant
}

export function Column({ column, pieces, quadrant }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })
    return (
        <div ref={setNodeRef} key={column.id} className={`relative w-[64px] h-full flex items-center ${quadrant[0] === 't' ? 'flex-col' : 'flex-col-reverse'}`}>
            <div
                className={`absolute border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent opacity-35 ${
                    quadrant[0] === 't'
                        ? `top-0 border-t-[250px] flex flex-col justify-end
                        ${column.id % 2 === 0 ? 'border-t-amber-700' : 'border-t-amber-300'}`
                        : `bottom-0 border-b-[250px] flex flex-col justify-start
                        ${column.id % 2 === 0 ? 'border-b-amber-700' : 'border-b-amber-300'}`
                } `}></div>
            {pieces.map((piece) => (
                <Piece key={piece.id} piece={piece} />
            ))}
        </div>
    )
}
