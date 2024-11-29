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
		const sendEmailSuccess = await sendEmail(user.email, user.name, randomCoupon.codeCoupon);
		return response.status(201).json({ message: 'Fine' });
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

const sendEmailOption2 = async (request, response) => {
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
		const sendEmailSuccess = await sendEmailWithTemplate(
			user.email,
			user.name,
			randomCoupon.codeCoupon,
			randomCoupon.description
		);
		return response.status(201).json({ message: 'Fine' });
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

module.exports = { sendEmailOption1, sendEmailOption2 };
