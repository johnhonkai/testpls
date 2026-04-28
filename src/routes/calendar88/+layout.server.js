
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/NDcmtwq.png'
        : 'https://i.imgur.com/jVSJJ65.jpeg';

    return {
        ogImage
    };
}