
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/77dOiIK.png'
        : 'https://i.imgur.com/JYdGPW1.png';

    return {
        ogImage
    };
}