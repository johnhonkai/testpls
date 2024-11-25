//import { incrementViewCount } from '$lib/firebasecounter'; // Adjust the path

export async function load({ params }) {
    const post = await import(`../${params.slug}.svx`);
    const { title, date, version, image, lastModifiedDate } = post.metadata;
  const content = post.default;



  return {
    content,
    title,
    date,
    version,
    image,
    lastModifiedDate: new Date(lastModifiedDate),
  };
}