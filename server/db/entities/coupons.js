const supabase = require('../../services/supabase');

const getAllCoupons = async () => {
	const { data, error } = await supabase.from('coupons').select();
	if (error) {
		console.error(error);
		return;
	}
	return data;
};

const createCouponByUser = async (idCoupon, idUser) => {
	const { data, error } = await supabase.from('usesCoupons').insert([
		{
			created_at: new Date(),
			idCoupon: idCoupon,
			userAsigned: idUser,
		},
	]);
	if (error) {
		console.error(error);
		return;
	}
	return data;
};

const validateUser = async (userAsigned) => {
	const { data, error } = await supabase.from('usesCoupons').select().eq('userAsigned', userAsigned);
	console.log(userAsigned);
	if (error) {
		console.error(error);
		return error;
	}
	console.log(data);
	return data.length > 0 ? true : false;
};

module.exports = {
	getAllCoupons,
	createCouponByUser,
	validateUser,
};
