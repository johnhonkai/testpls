import { incrementViewCount } from '$lib/firebasecounter'; // Adjust the path

export async function load({ params }) {
    const post = await import(`../${params.slug}.svx`);
    const { title, date, version, image, lastModifiedDate } = post.metadata;
  const content = post.default;

  // Increment the view count and fetch the updated count, including dates
  const data = await incrementViewCount(params.slug);

  // Safely parse creationDate and lastModifiedDate
  let creationDate = data.creationDate;

  if (creationDate?.toDate) {
    // Firestore Timestamp
    creationDate = creationDate.toDate();
  } else if (typeof creationDate === 'string') {
    // Parse string to Date
    creationDate = new Date(creationDate);
  } else if (!creationDate) {
    // Default to current date if missing
    creationDate = new Date();
  }

  return {
    content,
    title,
    date,
    version,
    image,
    creationDate,
    lastModifiedDate: new Date(lastModifiedDate),
    views: data.views || 0, // Default to 0 if views is missing
  };
}