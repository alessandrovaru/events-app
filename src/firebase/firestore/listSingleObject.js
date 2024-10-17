import { getFirebaseApp } from "@/app/auth/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(getFirebaseApp());

export default async function getMetadata(docId) {
  const docRef = doc(db, "metadata", docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document!");
    return null;
  }
}
