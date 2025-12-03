
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/cWv1mUQ.png'
        : 'https://i.imgur.com/zN3JiRW.jpeg';

    return {
        ogImage
    };
}