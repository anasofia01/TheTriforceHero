const supabase = require('../../services/supabase');

const getAllUsers = async () => {
	const { data, error } = await supabase.from('users').select();
	if (error) {
		console.error(error);
		return error;
	}
	return data;
};

const createUser = async (name, email, cellphone) => {
	const { data, error } = await supabase.from('users').insert([
		{
			name,
			email,
			cellphone,
			created_at: new Date(),
		},
	]);
	if (error) {
		console.error(error);
		return error;
	}
	console.log(data);
	return data;
};

const getUserbyEmail = async (email) => {
	const { data, error } = await supabase.from('users').select().eq('email', email);
	if (error) {
		console.error(error);
		return error;
	}
	return data.length > 0 ? data[0] : null;
};

module.exports = { getAllUsers, createUser, getUserbyEmail };
