require('dotenv').config();
const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
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