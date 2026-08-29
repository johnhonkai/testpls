
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/W8C08xU.png'
        : 'https://i.imgur.com/G3YvTq1.jpeg';

    return {
        ogImage
    };
}