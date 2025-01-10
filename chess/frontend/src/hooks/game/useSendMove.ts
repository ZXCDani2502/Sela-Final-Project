import { Move } from 'chess.js'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useSendMove = () => {
    const [loading, setLoading] = useState(false)
    const [move, setMove] = useState<Move | null>(null)

    const sendMove = async (move: Move) => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:6600/api/chess/send/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ move }),
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            setMove(data.move)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { sendMove, loading }
}

export default useSendMove
