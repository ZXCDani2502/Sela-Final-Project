import { useDraggable } from '@dnd-kit/core'
import { Piece as PieceType } from '../../types'

type PieceProps = {
    piece: PieceType
}

const Piece = ({ piece }: PieceProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: piece.id,
    })
    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined

    return (
        <>
            {piece.color === 'b' ? (
                <div
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    style={style}
                    className='relative flex items-center justify-center w-12 h-12 bg-gradient-to-t from-black to-gray-700 rounded-full shadow-lg'>
                    {/* Outer Ring */}
                    <div className='absolute inset-1 bg-gradient-to-t from-gray-900 to-gray-800 rounded-full'></div>
                    {/* Middle Ring */}
                    <div className='absolute inset-2 bg-gradient-to-t from-gray-850 to-gray-700 rounded-full'></div>
                    {/* Inner Ring */}
                    <div className='absolute inset-2.5 bg-gradient-to-t from-gray-900 to-gray-800 rounded-full'></div>
                    {/* Center Circle */}
                    <div className='relative w-4 h-4 bg-gradient-to-t from-black to-gray-700 rounded-full'></div>
                </div>
            ) : (
                <div
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    style={style}
                    className='relative flex items-center justify-center w-12 h-12 bg-gradient-to-t from-gray-300 to-white rounded-full shadow-lg'>
                    {/* Outer Ring */}
                    <div className='absolute inset-1 bg-gradient-to-t from-gray-200 to-gray-100 rounded-full'></div>
                    {/* Middle Ring */}
                    <div className='absolute inset-2 bg-gradient-to-t from-gray-150 to-white rounded-full'></div>
                    {/* Inner Ring */}
                    <div className='absolute inset-2.5 bg-gradient-to-t from-gray-200 to-gray-100 rounded-full'></div>
                    {/* Center Circle */}
                    <div className='relative w-4 h-4 bg-gradient-to-t from-gray-300 to-white rounded-full'></div>
                </div>
            )}
        </>
    )
}

export default Piece
