
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/2gRFnQ0.png'
        : 'https://i.imgur.com/lYvX32y.jpeg';

    return {
        ogImage
    };
}