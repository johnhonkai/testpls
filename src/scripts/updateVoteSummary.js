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
        const votesCollection = db.collection("votes");
        const snapshot = await votesCollection.get();

        if (snapshot.empty) {
            console.error("No votes found!");
            return;
        }

        const voteSummary = {};

        snapshot.forEach((doc) => {
            const { category, vote } = doc.data();

            if (!voteSummary[category]) {
                voteSummary[category] = {};
            }

            if (!voteSummary[category][vote]) {
                voteSummary[category][vote] = 0;
            }

            voteSummary[category][vote] += 1; // Increment the count
        });

        // Save the vote summary to the local JSON file
        const filePath = path.join(__dirname, "../lib/data/voteSummary.json");
        await writeFile(filePath, JSON.stringify(voteSummary, null, 2));
        console.log("voteSummary.json has been updated successfully!");
    } catch (error) {
        console.error("Error fetching vote summary:", error);
    }
}

fetchVoteSummary();
