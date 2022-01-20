import { headers } from '$lib/static';
import * as html2json from 'html2json';
// import * as puppeteer from 'puppeteer';

export const search = async (title) => {
    // Variables
    const provider = 'https://123moviess.se';
    // Fetch and Prepare Data
    const searchResults = await fetch(`${provider}/searchs/?s=${title}`, headers);
    const body = await searchResults.text();
    const htmlBody = body.match(/<body([\s\S]*?)(.*)<\/body>/g).toString();
    const jsonBody = html2json.default.html2json(htmlBody);
    const bodyJSON = jsonBody.child[0];
    // Calculate Response
    const movieList = bodyJSON.child[1].child[1].child[3].child[1].child[1].child[3].child[1];
    let movies = movieList.child.filter(i => i.attr && i.attr.class.indexOf('col-lg-3') !== -1);
    // // Map and Normalize
    movies = movies.map(i => {
        const link = i.child[1];
        if (!link) { return }
        return {
            id: null,
            href: provider + link.child[5].attr.href,
            year: null,
            rating: null,
            quality: link.child[1].child[0].text,
            poster: provider + link.child[3].child[1].attr.src,
            title: link.child[5].child[0].text,
            provider
        }
    }).filter(i => i);
    return movies;
}

export const post = async (movie, page) => {
    // await page.goto(`${movie.href}watching`);
    // const frames = await page.frames();
    // const frame = frames.sort((a, b) => a.url().split('').length > b.url().split('').length ? -1 : 1)[0];
    // const interv = setInterval(async () => {
    //     const video = await frame.$('.jw-video');
    //     const src = await video.getProperty('src');
    //     const srcVal = await src.jsonValue();
    //     if ((!srcVal || srcVal == '')) {
    //         await frame.click('.jw-video')
    //     } else {
    //         clearInterval(interv);
    //         console.log('Downloading: ');
    //         return srcVal;
    //     }
    // }, 100)
    return null;
}