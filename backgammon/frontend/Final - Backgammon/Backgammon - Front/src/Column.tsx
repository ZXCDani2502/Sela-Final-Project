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
        <div key={column.id} className='w-[64px] h-full relative'>
            <div
                ref={setNodeRef}
                className={`absolute flex w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent 
                    ${
                        quadrant[0] === 't'
                            ? `top-0 border-t-[250px] flex flex-col justify-end
                                ${column.id % 2 === 0 ? 'border-t-amber-700' : 'border-t-amber-300'}`
                            : `bottom-0 border-b-[250px] flex flex-col justify-start 
                                ${column.id % 2 === 0 ? 'border-b-amber-700' : 'border-b-amber-300'}`
                    } `}>
                <div className={`flex ${quadrant[0] === 't' ? 'flex-col-reverse' : 'flex-col'} items-center z-10`}>
                    {pieces.map((piece) => (
                        <Piece key={piece.id} piece={piece} />
                    ))}
                </div>
            </div>
        </div>
    )
}
