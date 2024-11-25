import { incrementViewCount } from '$lib/firebasecounter'; // Adjust the path
import path from 'path';

export async function load({ params }) {
  try {
    // Resolve the correct path for the .svx file
    const postPath = path.resolve('src/routes/betanews', `${params.slug}.svx`);
    const post = await import(postPath);

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
  } catch (err) {
    console.error('Error loading post:', err);
    throw error(500, 'Internal Server Error');
  }
}
