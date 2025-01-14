// types.ts
export interface MessageInfo {
    userName: string;
    message: string;
  }
  
  export interface MessageProps {
    messageInfo: MessageInfo;
  }
  
  export interface ChatProps {
    messages: MessageInfo[];
    chatRoom: string;
    sendMessage: (message: string) => void;
    closeChat: () => void;
  }