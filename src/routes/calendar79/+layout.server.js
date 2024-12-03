
export async function load({ url }) {
    // Check for the query parameter
    const isBoss = url.searchParams.has('boss');

    // Return dynamic OG image based on the query parameter
    const ogImage = isBoss
        ? 'https://i.imgur.com/2O1jd2R.png'
        : 'https://i.imgur.com/UcRrarh.png';

    return {
        ogImage
    };
}