

export async function load({ params }) {
	const post = await import(`../${params.slug}.svx`);
	const { title, date, version, image, customSlug} = post.metadata;
	const content = post.default;
    const allPosts = import.meta.glob('../*.svx');
    const rawPosts = import.meta.glob('../*.svx', { as: 'raw' });
    
    const articles = [];
    for (const path in allPosts) {
        const module = await allPosts[path]();
        const metadata = module.metadata;
    
        const rawcontent = module.rawContent;
        const slug = path.split('/').pop().replace('.svx', '');
    
        if (slug !== 'welcome') {
            articles.push({
                ...metadata,
                rawcontent, // Include raw content
                slug,
            });
        }
    }
    

	// Group and sort articles by category and sortOrder
	const categorizedArticles = articles.reduce((acc, article) => {
		const { category } = article;
		if (!acc[category]) acc[category] = [];
		acc[category].push(article);
		return acc;
	}, {});

	// Sort each category by sortOrder
	for (const category in categorizedArticles) {
		categorizedArticles[category].sort(
			(a, b) => a.sortOrder - b.sortOrder || new Date(b.date) - new Date(a.date)
		);
	}

	const sortedCategories = sortCategories(Object.keys(categorizedArticles));

    return {
        slug: params.slug,
        content,
        title,
        date,
        version,
        image,
        categorizedArticles,
        sortedCategories,
        allArticles: articles, // Pass articles with rawContent
    };
    
}

// Helper function to define the custom sort order for categories
function sortCategories(categories) {
	const predefinedOrder = ['Event', 'Getting Started', 'Valk', 'Astral Ring', 'Shop', 'Uncategorized'];
	return categories.sort((a, b) => {
		const aIndex = predefinedOrder.indexOf(a);
		const bIndex = predefinedOrder.indexOf(b);
		return (aIndex === -1 ? predefinedOrder.length : aIndex) - (bIndex === -1 ? predefinedOrder.length : bIndex);
	});
}
