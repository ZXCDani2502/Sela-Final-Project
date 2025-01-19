import { useEffect, useState } from 'react'

const usePassTurn = (first?: 'w' | 'b') => {
    const [turn, setTurn] = useState<'w' | 'b' | undefined>(first ? first : undefined)

    useEffect(() => {
        setTurn(turn === 'w' ? 'b' : 'w')
    }, [])

    return turn
}

export default usePassTurn
