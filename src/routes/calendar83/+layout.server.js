
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/19bHJpL.png'
        : 'https://i.imgur.com/qcZqSOJ.jpeg';

    return {
        ogImage
    };
}