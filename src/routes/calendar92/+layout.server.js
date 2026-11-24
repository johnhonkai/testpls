
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/2LeJ3z0.png'
        : 'https://i.imgur.com/iP9eTnl.jpeg';

    return {
        ogImage
    };
}