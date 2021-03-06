
// const puppeteer = require('puppeteer');
// const https = require('https');
// const fs = require('fs');

import * as provider1 from '$lib/providers/123movie.lc.js';
import * as provider2 from '$lib/providers/123moviess.se.js';
import * as provider3 from '$lib/providers/goojara.to.js';

const download = async (name, url) => {
    https.get(url, res => {
        if (!fs.existsSync('./downloads')) {
            fs.mkdirSync('./downloads', { recursive: true });
        }
        const stream = fs.createWriteStream(`./downloads/${name}.mp4`);
        res.pipe(stream);
        stream.on('finish', () => {
            stream.close();
        })
    })
    await browser.close();
}

export const get = async (request) => {
    const title = request.url.searchParams.get('title');
    if (!title) { return { status: 400 } }
    const providers = [
        provider1, provider2, provider3
    ];

    const results = await Promise.all(providers.map(i => i.search(title)));
    // const res = await provider3.search(title);

    return {
        body: results
    };
}

export const post = async (request) => {
    const movie = request.body;
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const videoUrl = await provider1.post(movie, page);
    // Download
    return {
        body: videoUrl
    };
}