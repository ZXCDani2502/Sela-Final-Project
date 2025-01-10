import { Chess } from 'chess.js'
import { create } from 'zustand'

interface GameState {
    currentGame: Chess | null
    setCurrentGame: (currentGame: Chess) => void
}

const useChat = create<GameState>((set) => ({
    currentGame: null,
    setCurrentGame: (currentGame) => set({ currentGame }),
}))

export default useChat
