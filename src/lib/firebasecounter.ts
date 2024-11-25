import { getFirestore, doc, getDoc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { app } from '$lib/firebaseConfig';

const db = getFirestore(app);

export async function incrementViewCount(slug) {
  const docRef = doc(db, "posts", slug);

  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    await setDoc(docRef, {
      views: 1,
      creationDate: serverTimestamp(), // Firestore Timestamp
      lastModifiedDate: serverTimestamp(),
    });
  } else {
    await setDoc(docRef, {
      views: increment(1),
      lastModifiedDate: serverTimestamp(), // Update only lastModifiedDate
    }, { merge: true });
  }

  const updatedDoc = await getDoc(docRef);
  return updatedDoc.data();
}
