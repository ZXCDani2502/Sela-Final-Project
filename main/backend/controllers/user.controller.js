import User from "../models/user.model.js"

export const getAll = async (req, res) => {
	try {
		const users = await User.find({})
		console.log(users)
		res.status(200).json(users)
	} catch (err) {
		res.status(400).send(err.message)
	}
}

export const addUser = async (req, res) => {
	try {
		const user = req.body
		console.log(user)
		if (!user.Password || !user.Username) {
			console.log("hi")
			throw new Error("Username or password are missing")
		}

		await User.create(user)
		res.status(200).send(user)
	} catch (err) {
		res.status(400).send(err.message)
	}
}
