// src/routes/betanews/+page.js


export async function load() {
  const modules = import.meta.glob('./*.svx', { eager: true });
  
  // Map the imported modules to posts data
  const posts = Object.entries(modules).map(([filePath, module]) => {
    const slug = filePath.split('/').pop().replace('.svx', ''); // Get slug from filename
    const { title, version, image, sortOrder } = module.metadata;

    return {
      slug,
      title,
      version: version, // Convert version to number for sorting
      image,
      sortOrder: sortOrder || 0 // Default sortOrder to 0 if not defined
    };
  });

  // Sort posts by version (descending) and sortOrder (ascending within version)
  posts.sort((a, b) => {
    if (b.version !== a.version) {
      return b.version - a.version; // Descending by version
    }
    return a.sortOrder - b.sortOrder; // Ascending by sortOrder
  });

  return { posts };
}
