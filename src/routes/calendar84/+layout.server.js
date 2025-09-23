
export async function load({ url }) {

    const isBoss = url.searchParams.has('boss');

    const ogImage = isBoss
        ? 'https://i.imgur.com/J5Kqkyz.png'
        : 'https://i.imgur.com/DezmArN.jpeg';

    return {
        ogImage
    };


}