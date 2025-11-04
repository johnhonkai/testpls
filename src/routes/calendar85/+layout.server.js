
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/pEIRkYc.png'
        : 'https://i.imgur.com/XAwD5EN.jpeg';

    return {
        ogImage
    };
}