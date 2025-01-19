import Chess from '../components/chess/Chess'
import PlayerBanner from '../components/chess/PlayerBanner'
import useChessPlayer from '../hooks/chess/useChessPlayer'
import { useLocation } from 'react-router'
import Chat from '../components/chessChat/Chat'

const ChessPage = () => {
    const location = useLocation()
    const color = location.state
    const player = useChessPlayer(color)

    return (
        <div className='flex flex-row w-screen h-screen items-center justify-center '>
            <div>
                <PlayerBanner user={player} turn='w' />
                <Chess />
                <PlayerBanner user={player} turn='w' />
            </div>
            <Chat />
        </div>
    )
}
//OPTIONAL blur background on game end popup
export default ChessPage
