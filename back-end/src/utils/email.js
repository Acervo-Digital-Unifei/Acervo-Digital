import nodemailer from 'nodemailer';

let _transporter;
export function setupEmailTransporter(options) {
    _transporter = nodemailer.createTransport(options);
}

export const sendEmail = async (options) => await _transporter.sendMail({from: `Livraria Acervo Digital <${process.env.EMAIL_USERNAME}>`, ...options});
