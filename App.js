const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const cnn = 'https://lite.cnn.com/en';
const string = 'Trump';

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

getFromCNN((data) => {
    console.log(getLatestHeadline(data))
});