export const get = async (request) => {
    const title = request.url.searchParams.get('title');
    return {
        body: [
            {
                "id": 1433,
                "href": 'https://google.com/243234/watch',
                "poster": 'cutekiities.png',
                "title": title
            },
            {
                "id": 1433,
                "href": 'https://google.com/243234/watch',
                "poster": 'cutekiities.png',
                "title": title
            } 
        ]
    }
}