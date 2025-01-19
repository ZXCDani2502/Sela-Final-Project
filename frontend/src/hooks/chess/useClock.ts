import { useEffect, useState } from 'react'

const useClock = (turn: 'w' | 'b') => {
    const [whiteTime, setWhiteTime] = useState(600)
    const [blackTime, setBlackTime] = useState(600)
    const [winner, setWinner] = useState<'w' | 'b'>()

    useEffect(() => {
        if (turn === 'w') {
            const timer = setTimeout(() => {
                if (whiteTime > 0) setWhiteTime((t) => t - 1)
                else setWinner('b')
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [whiteTime])

    useEffect(() => {
        if (turn === 'b') {
            const timer = setTimeout(() => {
                if (blackTime > 0) setBlackTime((t) => t - 1)
                else setWinner('w')
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [blackTime])

    return { winner, whiteTime, blackTime }
}

export default useClock
