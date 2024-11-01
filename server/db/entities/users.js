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
			cel: cellphone,
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

module.exports = { getAllUsers, createUser };
