export type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

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
