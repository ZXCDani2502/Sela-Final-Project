export type PiecePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

export type Color = 'w' | 'b'

export type Piece = {
    id: number
    status: PiecePosition
}

export type PieceProps = {
    piece: Piece
    color: Color
}

export type Column = {
    id: PiecePosition
}

