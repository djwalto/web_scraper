const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();


var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: process.env.USER,
    to: 'davidjwalton2020@gmail.com',
    subject: '',
    text: ''
};

function sendMail(subject, text, link, url) {
    mailOptions.subject = subject;
    mailOptions.html = "<a href=" + url + link + ">" + text + "</a>";
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email has been sent: " + info.response);
        }
    });
}

module.exports = sendMail;