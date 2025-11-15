/*
	brain fuckkk
*/

import nodemailer from "nodemailer";
import generateRandomCode from "../utils/randOtp.js";
import {config} from "dotenv";

config();

export default async function SendMailOtp(mail) {
	const sixDigitCode = generateRandomCode();
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: '"Farming-coop" <farmingandagro@gmail.com>',
		to: mail,
		subject: "OTP code for signup and account validation",
		html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
            <p>Dear User,</p>
            <p>Your OTP code for signup and account validation is:</p>
            <p style="font-weight: bold; font-size: 24px; color: #4CAF50;">${sixDigitCode}</p>
            <p>Please use this code to complete your registration process.</p>
            <p>Thank you,<br>Farming-coop Team</p>
        </div>`,
		// text: `<b>${sixDigitCode}</b>`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Message sent: %s", info.messageId);
		return sixDigitCode;
	} catch (error) {
		console.error("Error sending email:", error);
	}
}
