const supabase = require('../../services/supabase');

const getAllUsers = async () => {
	const { data, error } = await supabase.from('users').select();
	if (error) {
		console.error(error);
		return error;
	}
	return data;
};

module.exports = { getAllUsers };
