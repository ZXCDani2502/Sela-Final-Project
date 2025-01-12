import React from 'react'

const Board = () => {
    return (
        <body className='flex justify-center items-center min-h-screen bg-gray-800'>
            <div className='bg-wood-light dark:bg-wood-dark bg-contain w-[800px] h-[400px] rounded-lg overflow-hidden border-4 border-gray-900 flex'>
                {/* Left Quadrant */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Points */}
                    <div className='flex h-1/2 flex-row-reverse'>
                        {/* 6 Points */}
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500 opacity-25'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                    </div>
                    {/* Bottom Points */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                    </div>
                </div>
                {/* Central Bar */}
                <div className='w-[10px] bg-gray-900'></div>
                {/* Right Quadrant */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Points */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px] border-b-red-500'></div>
                        </div>
                    </div>
                    {/* Bottom Points */}
                    <div className='flex h-1/2 flex-row-reverse'>
                        {/* 6 Points */}
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-red-500'></div>
                        </div>
                        <div className='w-1/6 h-full relative'>
                            <div className='absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px] border-t-yellow-500'></div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Board
