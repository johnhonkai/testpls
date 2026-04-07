
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/xW6bDA2.png'
        : 'https://i.imgur.com/tz77sJV.png';

    return {
        ogImage
    };
}