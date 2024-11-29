const brevo = require('@getbrevo/brevo'); // https://developers.brevo.com/
require('dotenv/config');

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

let sendSmtpEmail = new brevo.SendSmtpEmail();

const sendEmail = async (email, name, coupon) => {
	sendSmtpEmail.subject = 'YOU WON A PRIZE!!!!';
	sendSmtpEmail.htmlContent = `<html>
			<body>
				<h1>Helloo ${name}</h1>
				<p>You just won this ${coupon}. Don't forget to reclaimed</p>
			</body>
		</html>`;
	sendSmtpEmail.sender = {
		name: 'Ana Sofia Pacheco',
		email: 'pacheco.anasof@gmail.com',
	};
	sendSmtpEmail.to = [{ email, name }];
	sendSmtpEmail.replyTo = {
		email: 'pacheco.anasof@gmail.com',
		name: 'Support',
	};
	sendSmtpEmail.params = { parameter: coupon };

	try {
		return await apiInstance.sendTransacEmail(sendSmtpEmail);
	} catch (error) {
		console.error('fallo al enviar el email: ', error.response ? error.response.statusCode : error.message);
	}
};

const sendEmailWithTemplate = async (email, name, coupon, description) => {
	sendSmtpEmail.templateId = 1;
	sendSmtpEmail.subject = 'YOU WON A PRIZE FROM NINTENDO!!!!';
	sendSmtpEmail.sender = {
		name: 'Ana Sofia Pacheco',
		email: 'pacheco.anasof@gmail.com',
	};
	sendSmtpEmail.to = [{ email, name }];
	sendSmtpEmail.replyTo = {
		email: 'pacheco.anasof@gmail.com',
		name: 'Support',
	};
	sendSmtpEmail.params = { coupon, name, description };

	try {
		return await apiInstance.sendTransacEmail(sendSmtpEmail);
	} catch (error) {
		console.error(error);
	}
};

module.exports = { sendEmail, sendEmailWithTemplate };
