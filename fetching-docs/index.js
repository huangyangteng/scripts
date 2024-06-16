const puppeteer = require('puppeteer-core')
const fs = require('fs')
const { saveCsvFile } = require('./util')
function stripHtmlTags(str) {
    return str.replace(/<[^>]*>/g, '')
}

async function nextJsTask(browser) {
    const BASE_URL = 'https://nextjs.org'
    const page = await browser.newPage()
    //设置可视区域大小
    await page.setViewport({ width: 1920, height: 960 })
    await page.goto('https://nextjs.org/docs', {
        timeout: 30 * 1000, //30s打开不了就抛出异常
        waitUntil: ['domcontentloaded']
    })
    const elements = await page.$$('nav.styled-scrollbar a')
    const links = await Promise.all(
        elements.map(async (item) => {
            return {
                title: await page.evaluate((item) => item.innerText, item),
                href: await page.evaluate(
                    (item) => item.getAttribute('href'),
                    item
                )
            }
        })
    )
    // console.log(links)

    let list = []
    const len = links.length
    for (let i = 0; i < len; i++) {
        const { title, href } = links[i]
        await page.goto(`${BASE_URL}${href}`, {
            timeout: 30 * 1000, //30s打开不了就抛出异常
            waitUntil: ['domcontentloaded']
        })
        const text = await page.evaluate(
            (item) => item.innerText,
            await page.$('.prose')
        )
        let sentences = text
            .split('\n')
            .map((item) => stripHtmlTags(item).trim())
            .filter((item) => item.length > 40 && !item.includes('import {'))
        list.push({
            link: i,
            sentences,
            source: 1
        })
    }
    await saveCsvFile('next.csv', list)
    await page.close()
}

;(async () => {
    // 预先启动一个chrome实例，这里直接连接到对应的端口
    const browserURL = 'http://127.0.0.1:9222'
    const browser = await puppeteer.connect({
        browserURL: browserURL,
        defaultViewport: null // 可选：指定默认视口大小
    })
    nextJsTask(browser)
})()
