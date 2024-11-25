/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

admin.initializeApp();

exports.updateVoteSummaries = functions.pubsub
    .schedule("every 1 hours")
    .onRun(async () => {
        const db = admin.firestore();
        const voteCategories = ["Best Valkyrie", "Best Chapter", "Best Boss", "Sussiest Songque Moment"];
        const voteSummary = {};

        for (const category of voteCategories) {
            const q = db.collection("votes").where("category", "==", category);
            const snapshot = await q.get();
            const counts = {};

            snapshot.forEach((doc) => {
                const { vote } = doc.data();
                if (vote) {
                    counts[vote] = (counts[vote] || 0) + 1;
                }
            });

            voteSummary[category] = counts;
        }

        // Save the summary to a JSON file
        const filePath = path.join(__dirname, "voteSummary.json");
        fs.writeFileSync(filePath, JSON.stringify(voteSummary, null, 2));
        console.log("Vote summaries saved to voteSummary.json.");
    });
