import { useDraggable } from '@dnd-kit/core'
import { Piece } from './types'

type PieceProps = {
    piece: Piece
}

export const TaskCard = ({ piece }: PieceProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: piece.id,
    })
    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined

    return (
        <div
            ref={setNodeRef}  
            {...listeners}
            {...attributes}
            className='cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-sm'
            style={style}
        />
    )
}
