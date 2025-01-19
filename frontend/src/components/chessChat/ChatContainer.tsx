import MessageInput from './MessageInput'
import Messages from './Messages'

//TODO: page fitting
const ChatContainer = () => {
    return (
        <div className='bg-base-300 flex flex-col'>
            {/*header*/}
            <div className='bg-base-200 px-4 py-2 mb-2'>
                <span className='font-bold'></span>
            </div>
            <Messages />
            <MessageInput />
        </div>
    )
}
//NOTE Get Conversations in the tutorial for permanent chat
export default ChatContainer
