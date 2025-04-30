
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/K5e8B35.png'
        : 'https://i.imgur.com/EbuDJiq.png';

    return {
        ogImage
    };
}