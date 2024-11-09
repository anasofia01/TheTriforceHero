const { getIO } = require('../socket');

const users = require('../db/entities/users');

const getUsers = async (req, res) => {
	try {
		const userResponse = await users.getAllUsers();
		res.status(200).json(userResponse);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createUsers = async (req, res) => {
	try {
		console.log(req.body, 'se crea el usuario');
		const { name, email, cellphone } = req.body;
		const userResponse = await users.createUser(name, email, cellphone);
		res.status(200).json(userResponse);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserbyEmail = async (email) => {
	try {
		return await users.getUserbyEmail(email);
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = { getUsers, createUsers, getUserbyEmail };
