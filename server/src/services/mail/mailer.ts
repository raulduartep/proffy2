import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIl_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default transport;