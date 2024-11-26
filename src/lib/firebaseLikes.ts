import { getFirestore, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { app } from "$lib/firebaseConfig"; // Your Firebase configuration

const db = getFirestore(app);

/**
 * Check if the user has already liked based on their voterId.
 * @param {string} charName - The route name (e.g., "sparkle").
 * @param {string} voterId - The user's unique voter ID.
 * @returns {Promise<boolean>} - Whether the user has already liked.
 */


export async function hasUserLiked(charName, voterId) {
  const docRef = doc(db, "charlikes", charName);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return data.voterIds?.includes(voterId) || false;
  }
  return false;
}

export async function getLikesFromFirestore(charName) {
  const docRef = doc(db, "charlikes", charName);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data().likes || 0; // Default to 0 if "likes" field is missing
  } else {
    return 0; // Default to 0 if document doesn't exist
  }
}

/**
 * Increment the like count and store the user's voterId.
 * @param {string} charName - The route name (e.g., "sparkle").
 * @param {string} voterId - The user's unique voter ID.
 * @returns {Promise<number>} - The updated like count.
 */
export async function likeWithVoterId(charName, voterId) {
  const docRef = doc(db, "charlikes", charName);

  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    // Create a new document if it doesn't exist
    await setDoc(docRef, {
      likes: 1,
      voterIds: [voterId], // Store the voterId
    });
    return 1;
  } else {
    // Update the document by incrementing likes and adding the voterId
    await setDoc(docRef, {
      likes: docSnapshot.data().likes + 1,
      voterIds: arrayUnion(voterId), // Add the voterId to the array
    }, { merge: true });

    const updatedDoc = await getDoc(docRef);
    return updatedDoc.data().likes;
  }
}


