import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import firebase from 'firebase/app';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(GoogleAuthProvider);
    // User signed in successfully
    const user = result.user;
    // ...
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};