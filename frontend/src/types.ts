//chess
export type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23

export type Color = 'w' | 'b'

export type Piece = {
    id: number
    position: Position
    color: Color
}

export type Column = {
    id: Position
}

export type Quadrant = 'tl' | 'tr' | 'bl' | 'br'

//backgammon chat
export interface MessageInfo {
    userName: string
    message: string
}

export interface MessageProps {
    messageInfo: MessageInfo
}

export interface ChatProps {
    messages: MessageInfo[]
    chatRoom: string
    sendMessage: (message: string) => void
    closeChat: () => void
}
