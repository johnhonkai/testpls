import admin from "firebase-admin";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

async function fetchVoteSummary() {
    try {
        const doc = await db.collection("votes_summary").doc("totals").get();
        if (!doc.exists) {
            console.error("No vote summary found!");
            return;
        }

        // Save the vote summary to the local JSON file
        const data = doc.data();
        const filePath = path.join(__dirname, "../../lib/data/voteSummary.json"); // Adjust the path as needed
        await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log("voteSummary.json has been updated successfully!");
    } catch (error) {
        console.error("Error fetching vote summary:", error);
    }
}

fetchVoteSummary();
