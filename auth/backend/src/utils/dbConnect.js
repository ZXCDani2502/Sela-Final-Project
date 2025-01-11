import mongoose from 'mongoose'

const PORT = process.env.PORT || 8080

export const dbConnect = async (app) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CONN)
        console.log(`MongoDB connected: ${conn.connection.host}`)

        app.listen(PORT, () => {
            console.log('server is running on PORT:' + PORT)
        })
    } catch (error) {
        console.log('MongoDB connection error:', error)
    }
}
