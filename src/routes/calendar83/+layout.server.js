
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/u7Wfdzm.png'
        : 'https://i.imgur.com/rhUjbcZ.jpeg';

    return {
        ogImage
    };
}