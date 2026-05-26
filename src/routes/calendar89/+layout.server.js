
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/7Jg6mhW.png'
        : 'https://i.imgur.com/vpt7BTO.jpeg';

    return {
        ogImage
    };
}