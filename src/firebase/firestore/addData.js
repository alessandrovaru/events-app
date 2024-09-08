import firebase_app from "../config";
import { getFirestore } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore"; 


const db = getFirestore(firebase_app)

export default async function addData(collection_name, data) {
    let docRef = null;
    let error = null;

    try {
        docRef = await addDoc(collection(db, collection_name), data);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    return { docRef, error };
}