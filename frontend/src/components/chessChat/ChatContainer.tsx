import MessageInput from "./MessageInput"
import Messages from "./Messages"

//TODO: page fitting
const ChatContainer = () => {
    return (
        <div className='bg-slate-500 flex flex-col'>
            {/*header*/}
            <div className='bg-slate-600 px-4 py-2 mb-2'>
                <span className='text-gray-900 font-bold'>Osher</span>
            </div>
            <Messages />
            <MessageInput />
        </div>
    )
}
//NOTE Get Conversations in the tutorial for permanent chat
export default ChatContainer
