import admin from "firebase-admin";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK with default credentials
admin.initializeApp();

const db = admin.firestore();

async function updateViews() {
    try {
        const viewsCollection = db.collection("views"); // Adjust collection name if needed
        const snapshot = await viewsCollection.get();

        const views = {};

        snapshot.forEach((doc) => {
            const { views: viewCount } = doc.data();
            views[doc.id] = viewCount || 0; // Store only the view count
        });

        const filePath = path.join(__dirname, "../../lib/data/views.json"); // Adjust the path as needed
        await writeFile(filePath, JSON.stringify(views, null, 2));
        console.log("views.json has been updated successfully!");
    } catch (error) {
        console.error("Error updating views:", error);
    }
}

updateViews();
