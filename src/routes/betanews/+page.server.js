export async function load() {
  const modules = import.meta.glob('./*.svx', { eager: true });
  
  // Map the imported modules to posts data
  const posts = Object.entries(modules).map(([filePath, module]) => {
    const slug = filePath.split('/').pop().replace('.svx', ''); // Get slug from filename
    const { title, version, image } = module.metadata;

    return {
      slug,
      title,
      version: parseFloat(version), // Convert version to number for sorting
      image,
    };
  });

  // Sort posts by version in descending order
  posts.sort((a, b) => b.version - a.version);

  return { posts };
}
