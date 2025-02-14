
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/12Tlr1O.png'
        : 'https://i.imgur.com/axSwM2P.png';

    return {
        ogImage
    };
}