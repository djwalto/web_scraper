const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

const url = 'https://www.youtube.com/c/DudePerfect/videos';
const string = 'Trick Shots';
const sendMail = require("./MailSender");

async function fetchFromYouTube(resp) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    resp(await page.content())
    browser.close()
}

function getLatestTitle(data) {
    const $ = cheerio.load(data)
    let VideoTitles = [];
    $('div #details')
        .children('div #meta')
        .children('h3')
        .children('a')
        .each(function (i, el) {
            VideoTitles.push({ title: $(el).text(), link: $(el).attr('href') });
        })
    return VideoTitles[0];
}


function compare() {
    let previousTitle, latestTitle;

    fetchFromYouTube((data) => {
        previousTitle = getLatestTitle(data);
    }).then(() => {

        fetchFromYouTube((data) => {
            latestTitle = getLatestTitle(data);
            if (latestTitle.title !== previousTitle.title) {
                console.log("new video found");
                if (latestTitle.title.includes('Trick Shot')) {
                    sendMail('Trick Shot Video Found', title.title, title.link, "https://www.youtube.com");
                }
            }
        })
    })
        .then(() => {
            compare();
        })

}

compare();

sendMail('Trick Shot Video Found', "Basketball player", "www.youtube.com/", "https://www.youtube.com");

// setInterval(compare, 10 * 1000);

