
export async function load({ url }) {

    const isBoss = url.searchParams.has('boss');

    const ogImage = isBoss
        ? 'https://i.imgur.com/5BSMaEm.png?ver=2'
        : 'https://i.imgur.com/Lb76zGr.jpeg?ver=2';

    return {
        ogImage
    };


}