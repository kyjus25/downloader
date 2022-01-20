import { headers } from '$lib/static';
import * as html2json from 'html2json';
import FormData from 'form-data';

export const search = async (title) => {
    // Variables
    const provider = 'https://www.goojara.to';
    // Fetch and Prepare Data
    const dataArray = new FormData();
    dataArray.append('q', title);
    const searchResults = await fetch(`${provider}/xhrr.php`, { method: 'POST', body: dataArray });
    console.log('resu.ts', searchResults);
    const body = await searchResults.text();
    const htmlBody = body.toString();
    const jsonBody = html2json.default.html2json(htmlBody);
    const bodyJSON = jsonBody.child[0];
    // // Calculate Response
    let movies = bodyJSON.child[0].child;
    const movieData = await Promise.all(
        movies.map(i => fetch(provider + i.child[0].attr.href, headers).then(i => i.text()))
    );
    // Map and Normalize
    movies = movies.map((i, index) => {
        const href = provider + i.child[0].attr.href;

        const data = movieData[index];
        const htmlBody = data.match(/<body([\s\S]*?)(.*)<\/body>/g).toString();
        const jsonBody = html2json.default.html2json(htmlBody);

        return {
            id: null,
            href,
            year: i.child[0].child[0].child[1].text.trim().replace('(', '').replace(')', ''),
            rating: null,
            quality: null,
            poster: jsonBody.child[0].child[3].child[9]?.child[1].child[1].child[4].child[0].child[0].attr.src?.replace('//', 'https://'),
            title: i.child[0].child[0].child[0].child[0].text,
            provider
        }
    }).filter(i => i);
    return movies;
}

export const post = async (title) => {
}