import { getFirebaseApp, getFirebaseAuth } from "@/app/auth/firebase";
import { signInWithCustomToken } from "firebase/auth";
import {doc, getDoc, getFirestore, updateDoc, setDoc} from 'firebase/firestore';
import {getValidCustomToken} from 'next-firebase-auth-edge/lib/next/client';

// Function to generate a random string similar to Firebase UID
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function addData(serverCustomToken, collection_name, data) {
    const auth = getFirebaseAuth();

    const customToken = await getValidCustomToken({
        serverCustomToken,
        refreshTokenUrl: '/api/refresh-token'
      });

      if (!customToken) {
        throw new Error('Invalid custom token');
      }

      const db = getFirestore(getFirebaseApp());



      const {user: firebaseUser} = await signInWithCustomToken(auth, customToken);
      const randomUID = generateRandomString(28);
      const docRef = doc(db, collection_name, randomUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        await updateDoc(docRef, data);
      } else {
        await setDoc(docRef, data);
  }

    // try {
    //     docRef = await addDoc(collection(db, collection_name), data);
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }

    return { docRef };
}