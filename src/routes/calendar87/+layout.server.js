
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/aqfjHJf.png'
        : 'https://i.imgur.com/i7FEmQ3.jpeg';

    return {
        ogImage
    };
}