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
		const { user } = req.body;
		db.users.push(user);
		res.status(200).json(db.users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { getUsers, createUsers };
