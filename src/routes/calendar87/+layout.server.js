
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/szL2ac8.png'
        : 'https://i.imgur.com/cS3qufU.jpeg';

    return {
        ogImage
    };
}