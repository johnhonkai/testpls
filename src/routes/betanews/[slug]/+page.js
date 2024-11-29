import viewsData from '$lib/data/views.json'; // Adjust the path as needed

export async function load({ params }) {
  const post = await import(`../${params.slug}.svx`);
  const { title, date, version, image, lastModifiedDate, creationDate } = post.metadata;
  const content = post.default;

  // Retrieve views from local JSON
  const views = viewsData[params.slug] || 0; // Use params.slug to match the key in your JSON



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