// src/routes/blog/[slug]/+page.js


export async function load({ params }) {
	const post = await import(`../${params.slug}.svx`);

	const creationDate = post.birthtime;  // File creation date
	const lastModifiedDate = post.mtime;  // Last modified date
  

	const { title, date, version, image } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		version,
    	image,
	};
}