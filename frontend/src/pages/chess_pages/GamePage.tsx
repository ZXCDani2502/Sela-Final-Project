import ChatContainer from '../../components/chat/ChatContainer'
import Game from '../../components/Chess'

const GamePage = () => {
    return (
        <div className='content-center flex flex-row'>
            <Game />
            <ChatContainer />
        </div>
    )
}
//OPTIONAL blur background on game end popup
export default GamePage
