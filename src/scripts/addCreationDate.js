import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to point directly to `routes/betanews`
const svxFolder = path.join(__dirname, '../../src/routes/betanews'); // Adjust relative path

(async () => {
    try {
        const files = await readdir(svxFolder);

        for (const file of files) {
            if (file.endsWith('.svx')) {
                const filePath = path.join(svxFolder, file);
                const content = await readFile(filePath, 'utf-8');

                // Check if `creationDate` metadata exists
                if (!content.includes('creationDate:')) {
                    const creationDate = `creationDate: "${new Date().toISOString()}"`;
                    const updatedContent = content.replace(/---/, `---\n${creationDate}`); // Add to metadata block
                    await writeFile(filePath, updatedContent);
                    console.log(`Added creationDate to ${file}`);
                }
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
})();
