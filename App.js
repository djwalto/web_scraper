const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const cnn = 'https://lite.cnn.com/en';
const string = 'coronavirus';
const sendMail = require("./MailSender");

function getFromCNN(resp) {
    fetch(cnn)
        .then(res => res.text())
        .then((html) => {
            resp(html);
        })
};

function getLatestHeadline(data) {
    const $ = cheerio.load(data);
    let Titles = [];
    $('ul').children('li').each(function (i, el) {
        Titles.push({
            title: $(el).text(), link: $(el).children('a').attr('href')
        })
    })
    return Titles[0];
};


function compare() {
    getFromCNN((data) => {
        let previousHeadline = getLatestHeadline(data)
        setTimeout(() => {
            getFromCNN((data) => {
                let newestHeadline = getLatestHeadline(data);
                if (newestHeadline.title !== previousHeadline.title) {
                    console.log('New article released');
                    if (newestHeadline.title.includes(string)) {
                        console.log("Coronavirus related article. Sending email.")
                    }
                }
            })
        }, 2 * 1000)
    })
};

sendMail('Hello world', "Samsung Watch", "facebook.com/", "");

setInterval(compare, 10 * 1000);