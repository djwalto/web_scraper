const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

const url = 'https://www.youtube.com/c/DudePerfect/videos';
const string = 'Trick Shots';
const sendMail = require(".MailSender");

async function fetchFromYouTube(resp) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    resp(await page.content())
    browser.close()
}