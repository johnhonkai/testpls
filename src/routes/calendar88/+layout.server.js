
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/fclS4Mk.png'
        : 'https://i.imgur.com/M0pSluB.jpeg';

    return {
        ogImage
    };
}