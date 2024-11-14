// src/routes/beta-news/+page.server.js

// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

export async function load() {
  const postsDir = path.resolve('src/routes/classroom');
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.svx'));

  // Map each file to its metadata and slug
  const posts = await Promise.all(files.map(async (file) => {
    const post = await import(`./${file}`);
    const filePath = path.join(postsDir, file);
    const stats = fs.statSync(filePath); // Get file system stats
    const creationDate = stats.birthtime; // Creation time
    const lastModifiedDate = stats.mtime; // Last modified time
    return {
      slug: file.replace('.svx', ''),
      title: post.metadata.title,
      version: post.metadata.version,
      image: post.metadata.image,
      creationDate, // Include creation date
      lastModifiedDate, // Include last modified date
    };
  }));

  posts.sort((a, b) => parseFloat(b.version) - parseFloat(a.version));

  return { posts };
}