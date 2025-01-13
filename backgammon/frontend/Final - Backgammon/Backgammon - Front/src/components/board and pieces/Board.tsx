const Board = () => {
    return (
        <body className='flex justify-center items-center min-h-screen bg-gray-800'>
            <div className='bg-wood-light dark:bg-wood-dark bg-contain w-[800px] h-[400px] rounded-sm overflow-hidden border-4 border-gray-900 flex'>
                {/* Left Side */}
                <div className='flex flex-col w-1/2 '>
                    {/* Top Quadrant */}
                    <div className='flex h-1/2 flex-row'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) =>(
                        <div key={i} className='w-1/6 h-full relative'>
                            <div className={`absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px]
                                ${i % 2 === 1 ? 'border-t-amber-700' : 'border-t-amber-300'} opacity-25`}></div>
                        </div>))}
                    </div>
                    {/* Bottom Quadrant */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) =>(
                        <div key={i} className='w-1/6 h-full relative'>
                            <div className={`absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px]
                                ${i % 2 === 0 ? 'border-b-amber-700' : 'border-b-amber-300'} opacity-25`}></div>
                        </div>))}
                    </div>
                </div>
                {/* Central Bar */}
                <div className='w-[10px] bg-amber-800'></div>
                {/* Right Side */}
                <div className='flex flex-col w-1/2'>
                    {/* Top Quadrant */}
                    <div className='flex h-1/2'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) =>(
                        <div key={i} className='w-1/6 h-full relative'>
                            <div className={`absolute top-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[200px]
                                ${i % 2 === 1 ? 'border-t-amber-700' : 'border-t-amber-300'} opacity-25`}></div>
                        </div>))}
                    </div>
                    {/* Bottom Points */}
                    <div className='flex h-1/2 flex-row-reverse'>
                        {/* 6 Points */}
                        {[...Array(6)].map((_, i) =>(
                        <div key={i} className='w-1/6 h-full relative'>
                            <div className={`absolute bottom-0 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[200px]
                                ${i % 2 === 1 ? 'border-b-amber-700' : 'border-b-amber-300'} opacity-25`}></div>
                        </div>))}
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Board
