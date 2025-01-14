import { Column } from '../../Column'
import { Column as ColumnType, Piece as PieceType } from '../../types'

type BoardProps = {
    columns: ColumnType[]
    pieces: PieceType[]
}

const Board = ({ columns, pieces }: BoardProps) => {
    return (
        <div className='flex justify-center items-center min-h-screen min-w-full bg-gray-800'>
            <div className='bg-wood-light dark:bg-wood-dark bg-cover  w-[788px] h-[600px] rounded-sm overflow-hidden border-4 border-yellow-800 flex'>
                {/* Left Side */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Quadrant */}
                    <div className='flex flex-row h-1/2 '>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 13} column={columns[i + 12]} pieces={pieces.filter((piece) => piece.position === i + 13)} quadrant='tl' />
                        ))}
                    </div>
                    {/* Bottom Quadrant */}
                    <div className='flex flex-row-reverse h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 7} column={columns[i + 6]} pieces={pieces.filter((piece) => piece.position === i + 7)} quadrant='bl' />
                        ))}
                    </div>
                </div>
                {/* Central Bar */}
                <div className='w-[20px] bg-yellow-800'></div>
                {/* Right Side */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Quadrant */}
                    <div className='flex flex-row h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 19} column={columns[i + 18]} pieces={pieces.filter((piece) => piece.position === i + 19)} quadrant='tr' />
                        ))}
                    </div>
                    {/* Bottom Quadrant */}
                    <div className='flex flex-row-reverse h-1/2 '>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 1} column={columns[i]} pieces={pieces.filter((piece) => piece.position === i + 1)} quadrant='br' />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board
