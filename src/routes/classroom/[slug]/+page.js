import sidebar from '$lib/data/sidebar.json';

export async function load({ params }) {
  const post = await import(`../${params.slug}.svx`);
  const { title, date, version, ogimage, update, customSlug } = post.metadata;
  const content = post.default;

  // Extract categories from the sidebar JSON
  const categorizedArticles = sidebar.categories;

  // Generate sorted categories dynamically
  const sortCategories = (categories) => {
    const predefinedOrder = ['Event', 'Getting Started', 'Valk', 'Astral Ring','Shop', 'Game Mechanics' ,  'Uncategorized'];
    return Object.keys(categories).sort((a, b) => {
      const aIndex = predefinedOrder.indexOf(a);
      const bIndex = predefinedOrder.indexOf(b);
      return (aIndex === -1 ? predefinedOrder.length : aIndex) - (bIndex === -1 ? predefinedOrder.length : bIndex);
    });
  };

  const sortedCategories = sortCategories(categorizedArticles);

  return {
    slug: params.slug,
    content,
    title,
    date,
    version,
    ogimage,
    update,
    categorizedArticles,
    sortedCategories,
  };
}
