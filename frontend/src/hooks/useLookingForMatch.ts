import { Move } from 'chess.js'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useLookingForMatch = () => {
    const [loading, setLoading] = useState(false)

    const checkForMatch = async () => {
        setLoading(true)
        try {
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading }
}

export default useLookingForMatch
