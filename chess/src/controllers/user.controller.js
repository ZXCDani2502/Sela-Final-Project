import User from '../models/user.model.js'

export const getUsersForChat = async (req, res) => {
	try {
		thisUser = req.user._id

		const users = await User.find({ _id: { $ne: thisUser } }).select('-password') //all users without the current one

		res.status(200).json(users)
	} catch (error) {
		console.log('Error in getUsersForChat: ', error.message)
		res.status(500).json({ error: 'Internal server error' })
	}
}

// export const addUser = async (req, res) => {
// 	try {
// 		const user = req.body
// 		console.log(user)
// 		if (!user.Password || !user.Username) {
// 			console.log("hi")
// 			throw new Error("Username or password are missing")
// 		}

// 		await User.create(user)
// 		res.status(200).send(user)
// 	} catch (err) {
// 		res.status(400).send(err.message)
// 	}
// }
