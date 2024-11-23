// src/routes/blog/[slug]/+page.js

import { incrementViewCount } from '$lib/firebasecounter'; // Adjust the path

export async function load({ params }) {
	const post = await import(`../${params.slug}.svx`);
  

	const { title, date, version, image } = post.metadata;
	const content = post.default;

	  // Increment the view count and fetch the updated count
	  const views = await incrementViewCount(params.slug);

	  const creationDate = post.metadata.creationDate || new Date(); // Use metadata or fallback
	  const lastModifiedDate = post.metadata.lastModifiedDate || new Date(); // Use metadata or fallback
	

	return {
		content,
		title,
		date,
		version,
    	image,
		creationDate,
		lastModifiedDate,
		views
	};
}
