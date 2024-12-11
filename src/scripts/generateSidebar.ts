// node --loader ts-node/esm src\scripts\generateSidebar.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Article {
    slug: string;
    title: string;
    category: string;
    sortOrder: number;
}

async function generateSidebarJson() {
    try {
        const svxDirectory = path.join(process.cwd(), 'src', 'routes', 'classroom');
        const files = fs.readdirSync(svxDirectory).filter(file => file.endsWith('.svx'));

        const articles: Article[] = [];

        for (const file of files) {
            const filePath = path.join(svxDirectory, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            const { data: metadata } = matter(fileContent);

            if (!metadata.title) {
                console.error(`Missing title in file: ${file}`);
                continue;
            }

            const slug = file.replace('.svx', '');

            // Exclude 'welcome.svx' from the articles list
            if (slug !== 'welcome') {
                articles.push({
                    slug,
                    title: metadata.title,
                    category: metadata.category ?? 'Uncategorized',
                    sortOrder: metadata.sortOrder ?? 999, // Default sort order
                });
            }
        }

        const categorizedArticles = articles.reduce((acc, article) => {
            const { category } = article;

            if (!acc[category]) acc[category] = [];
            acc[category].push(article);
            return acc;
        }, {} as Record<string, Article[]>);

        for (const category in categorizedArticles) {
            categorizedArticles[category].sort((a, b) => a.sortOrder - b.sortOrder);
        }

        const sidebarData = {
            categories: categorizedArticles,
        };

        const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'sidebar.json');
        fs.writeFileSync(outputPath, JSON.stringify(sidebarData, null, 2));

        console.log(`Sidebar JSON generated successfully at: ${outputPath}`);
    } catch (err) {
        console.error('Error generating sidebar JSON:', err);
    }
}

generateSidebarJson().catch((err) => {
    console.error('Unhandled error:', err);
});
