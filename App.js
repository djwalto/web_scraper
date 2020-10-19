const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const cnn = 'https://lite.cnn.com/en';
const string = 'coronavirus';

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

setInterval(() => {
    getFromCNN((data) => {
        const latestHeadline = getLatestHeadline(data);
        if (latestHeadline.title.includes(string)) console.log('Coronavirus article released!')
    })
}, 5 * 1000);