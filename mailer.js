const config = require('./config');

let nodemailer = require('nodemailer');
// send mail with password confirmation
let transporter = nodemailer.createTransport( {
    service:  config.email.service || process.env.EMAIL_SERVICE,
    auth: {
     user: config.email.user || process.env.EMAIL_USER,
     pass: config.email.password || process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;

