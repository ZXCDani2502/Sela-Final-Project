import Message from "./Message"

const Messages = () => {
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {/*overflow-auto is for adding a scrollbar when the content is too long*/}
            <Message />
            <Message />
        </div>
    )
}

export default Messages
