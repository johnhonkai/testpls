import admin from "firebase-admin";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the service account key JSON file
const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, "fbkey.json"), "utf-8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function updateLikes() {
    try {
        const likesCollection = db.collection("charlikes"); // Adjust collection name if needed
        const snapshot = await likesCollection.get();

        const likes = {};

        snapshot.forEach((doc) => {
            likes[doc.id] = doc.data().likes || 0; // Store only the like count
        });

        const filePath = path.join(__dirname, "../lib/data/likes.json");
        await writeFile(filePath, JSON.stringify(likes, null, 2));
        console.log("likes.json has been updated successfully!");
    } catch (error) {
        console.error("Error updating likes:", error);
    }
}

updateLikes();
