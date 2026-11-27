
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/dBjd0Yo.png'
        : 'https://i.imgur.com/MRQ503h.jpeg';

    return {
        ogImage
    };
}