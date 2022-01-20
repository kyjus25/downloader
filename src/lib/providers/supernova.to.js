import { headers } from '$lib/static';
import * as html2json from 'html2json';
// import * as FormData from 'form-data';

export const search = async (title) => {
    // Variables
    const provider = 'https://supernova.to';
    // Fetch and Prepare Data
    // const dataArray = new FormData();
    // dataArray.append('q', title);
    // const searchResults = await fetch(`${provider}/xkbc.php`, { ...headers, method: 'POST', body: dataArray });
    return searchResults;
    // const body = await searchResults.text();
    // const htmlBody = body.match(/<body([\s\S]*?)(.*)<\/body>/g).toString();
    // const jsonBody = html2json.default.html2json(htmlBody);
    // const bodyJSON = jsonBody.child[0];
    // // Calculate Response
    // const footerIndex = bodyJSON.child.findIndex(i => i.tag == 'footer');
    // let pageDiv = bodyJSON.child[footerIndex - 1].child[0];
    // pageDiv = pageDiv.child.find(i => i.child).child[0]
    // pageDiv = pageDiv.child.find(i => i.attr.class.includes('movies-list'))
    // let movies = pageDiv.child.filter(i => i.child);
    // // Map and Normalize
    // movies = movies.map(i => {
    //     const link = i.child[1];
    //     if (!link) { return }
    //     return {
    //         id: i.attr['data-movie-id'],
    //         href: link.attr.href,
    //         rating: link.child[1].child[0].text,
    //         quality: link.child[3].child[0].text,
    //         poster: link.child[5].attr.src,
    //         title: link.child[8].child[0].text,
    //         provider
    //     }
    // }).filter(i => i);
    // return movies;
}

export const post = async (title) => {
}