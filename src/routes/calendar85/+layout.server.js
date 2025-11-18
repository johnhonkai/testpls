
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/M3Z4Cum.png'
        : 'https://i.imgur.com/Y3iLJYj.jpeg';

    return {
        ogImage
    };
}