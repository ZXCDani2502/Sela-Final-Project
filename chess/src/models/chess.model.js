import mongoose from 'mongoose'
import { Chess } from 'chess.js'

//cSpell:ignore rnbqkbnr

const matchSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                color: 'b' | 'w',
            },
        ],
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
        game: [
            {
                type: String,
                default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            },
        ],
        winner: {
            type: mongoose.Schema.Types.ObjectId, // null if draw, undefined if game is ongoing
            ref: 'User',
            default: undefined,
        },
    },
    { timestamps: true }
)

const Match = mongoose.model('Match', matchSchema)

export default Match
