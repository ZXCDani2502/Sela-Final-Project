import { Column } from '../../Column'
import { Column as ColumnType, Piece as PieceType, Position } from '../../types'

type BoardProps = {
    columns: ColumnType[]
    pieces: PieceType[]
}

const Board = ({ columns, pieces }: BoardProps) => {
    return (
        <body className='flex justify-center items-center min-h-screen bg-gray-800'>
            <div className='bg-wood-light dark:bg-wood-dark bg-contain w-[800px] h-[400px] rounded-sm overflow-hidden border-4 border-gray-900 flex'>
                {/* Left Side */}
                <div className='flex flex-col w-1/2 '>
                    {/* Top Quadrant */}
                    <div className='flex h-1/2 flex-row'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 1} column={columns[i + 1]} pieces={pieces.filter((piece) => piece.position === i + 1)} />
                        ))}
                    </div>
                    {/* Bottom Quadrant */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 7} column={columns[i + 7]} pieces={pieces.filter((piece) => piece.position === i + 7)} />
                        ))}
                    </div>
                </div>
                {/* Central Bar */}
                <div className='w-[10px] bg-amber-800'></div>
                {/* Right Side */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Quadrant */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 13} column={columns[i + 13]} pieces={pieces.filter((piece) => piece.position === i + 13)} />
                        ))}
                    </div>
                    {/* Bottom Points */}
                    <div className='flex h-1/2 flex-row-reverse'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) => (
                            <Column key={i + 19} column={columns[i + 19]} pieces={pieces.filter((piece) => piece.position === i + 19)} />
                        ))}
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Board
