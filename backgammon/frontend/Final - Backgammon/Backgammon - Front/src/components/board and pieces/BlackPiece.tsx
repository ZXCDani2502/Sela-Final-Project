import { useDraggable } from '@dnd-kit/core'
import { Piece, PieceProps } from '../../types'

const OnePiece = ({ piece, color }: PieceProps) => {
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
            {color === 'b' ? (
                <div
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    className='relative flex items-center justify-center w-24 h-24 bg-gradient-to-t from-black to-gray-700 rounded-full shadow-lg'
                    style={style}>
                    {/* Outer Ring */}
                    <div className='absolute inset-2 bg-gradient-to-t from-gray-900 to-gray-800 rounded-full'></div>
                    {/* Middle Ring */}
                    <div className='absolute inset-4 bg-gradient-to-t from-gray-850 to-gray-700 rounded-full'></div>
                    {/* Inner Ring */}
                    <div className='absolute inset-5 bg-gradient-to-t from-gray-900 to-gray-800 rounded-full'></div>
                    {/* Center Circle */}
                    <div className='relative w-8 h-8 bg-gradient-to-t from-black to-gray-700 rounded-full'></div>
                </div>
            ) : (
                <div className='relative flex items-center justify-center w-24 h-24 bg-gradient-to-t from-gray-300 to-white rounded-full shadow-lg'>
                    {/* Outer Ring */}
                    <div className='absolute inset-2 bg-gradient-to-t from-gray-200 to-gray-100 rounded-full'></div>
                    {/* Middle Ring */}
                    <div className='absolute inset-4 bg-gradient-to-t from-gray-150 to-white rounded-full'></div>
                    {/* Inner Ring */}
                    <div className='absolute inset-5 bg-gradient-to-t from-gray-200 to-gray-100 rounded-full'></div>
                    {/* Center Circle */}
                    <div className='relative w-8 h-8 bg-gradient-to-t from-gray-300 to-white rounded-full'></div>
                </div>
            )}
        </>
    )
}

export default OnePiece
