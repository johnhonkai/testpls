
export async function load({ url }) {

    const isBoss = url.searchParams.has('boss');

    const ogImage = isBoss
        ? 'https://i.imgur.com/vR1cT4C.png'
        : 'https://i.imgur.com/Lb76zGr.jpeg';

    return {
        ogImage
    };


}