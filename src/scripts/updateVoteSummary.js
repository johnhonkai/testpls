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

async function fetchVoteSummary() {
    try {
        const newVoteCollection = db.collection("Vote2025");
        const snapshot = await newVoteCollection.get();

        if (snapshot.empty) {
            console.error("No documents found in 'newvote' collection!");
            return;
        }

        const voteSummary = {};

        snapshot.forEach((doc) => {
            const data = doc.data();
            const category = doc.id; // Use document ID as the category name

            voteSummary[category] = {};

            // Loop through each field in the document
            for (const [key, value] of Object.entries(data)) {
                if (key === "voterIds") {
                    continue; // Skip the voterIds field
                }
                voteSummary[category][key] = value; // Add vote counts to summary
            }
        });

        // Save the vote summary to the local JSON file
        const filePath = path.join(__dirname, "../lib/data/VoteSummary2025.json");
        await writeFile(filePath, JSON.stringify(voteSummary, null, 2));
        console.log("VoteSummary2025.json has been updated successfully!");
    } catch (error) {
        console.error("Error fetching vote summary:", error);
    }
}

fetchVoteSummary();
