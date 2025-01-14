import { Color } from 'chess.js'
import { useAuthStore } from '../../store/useAuthStore'

const useChessPlayer = (color: Color) => {
    const { authUser } = useAuthStore()
    const player = { username: authUser!.username, color: color }
    return player
}

export default useChessPlayer
