
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/jo5XuMG.png'
        : 'https://i.imgur.com/1fUHlZK.png';

    return {
        ogImage
    };
}