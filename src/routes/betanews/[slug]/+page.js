import viewsData from '$lib/data/views.json'; // Adjust the path as needed
import { incrementViewCount } from '$lib/firebasecounter'; // Increment function

export async function load({ params }) {
  const post = await import(`../${params.slug}.svx`);
  const { title, date, version, image, lastModifiedDate, creationDate } = post.metadata;
  const content = post.default;

  // Retrieve views from local JSON
  const views = viewsData[params.slug] || 0; // Use params.slug to match the key in your JSON

  try {
    await incrementViewCount(params.slug);
  } catch (error) {
    console.error('Error incrementing view count on Firebase:', error);
  }



  return {
    content,
    title,
    date,
    version,
    image,
    creationDate: new Date(creationDate),
    lastModifiedDate: new Date(lastModifiedDate),
    views
  };
}