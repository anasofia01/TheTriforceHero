const { sendEmail, sendEmailWithTemplate } = require('../services/brevo');
const coupons = require('../db/entities/coupons');
const userControllers = require('./users');

const sendEmailOption1 = async (request, response) => {
	try {
		const { body } = request;
		const user = await userControllers.getUserbyEmail(body.email);
		const validateUser = await coupons.validateUser(user.id);

		if (validateUser) {
			return response.status(400).json({ message: 'The user already have a coupon' });
		}

		const allCoupons = await coupons.getAllCoupons();
		const randomCoupon = allCoupons[Math.floor(Math.random() * allCoupons.length)];
		await coupons.createCouponByUser(randomCoupon.id, user.id);
		await sendEmail(user.email, user.name, randomCoupon.name);
		return response.status(201).json({ message: 'Fine' });
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

const sendEmailOption2 = async (request, response) => {
	try {
		const { body } = request;
		await sendEmailWithTemplate('pacheco.anasof@gmail.com', 'Ana Sofia Pacheco', 'YOU_WON_A_PEACH');
		response.status(201).send(body);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
};

module.exports = { sendEmailOption1, sendEmailOption2 };
