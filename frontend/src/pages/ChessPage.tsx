import ChatContainer from "../components/chat/ChatContainer"
import Chess from "../components/Chess"


const ChessPage = () => {
    return (
        <div className='content-center flex flex-row'>
            <Chess />
            <ChatContainer />
        </div>
    )
}
//OPTIONAL blur background on game end popup
export default ChessPage
