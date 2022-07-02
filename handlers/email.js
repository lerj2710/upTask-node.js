const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass
	}
});

const generarHtml = () => {
	const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`);
	return juice(html);
};

let info = transport.sendMail({
	from: '"Uptask 👻" <no-reply@uptask.com>',
	to: 'correo@correo.com',
	subject: 'hola ✔',
	text: 'hola mundo',
	html: generarHtml()
});
