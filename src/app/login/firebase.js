
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import {doc, getDoc, getFirestore, updateDoc, setDoc} from 'firebase/firestore';
import { getFirebaseApp } from '@/app/auth/firebase';

const CREDENTIAL_ALREADY_IN_USE_ERROR = 'auth/credential-already-in-use';



export const isCredentialAlreadyInUseError = (e) =>
  e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR;

export const logout = async (auth) => {
  return signOut(auth);
};

export const getGoogleProvider = (auth) => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({
    display: 'popup'
  });

  return provider;
};

export const loginWithProvider = async (
  auth,
  provider
) => {
  const db = getFirestore(getFirebaseApp());
  const result = await signInWithPopup(
    auth,
    provider,
    browserPopupRedirectResolver
  );

  const docRef = doc(db, 'users', result.user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      createdAt: result.user.metadata.creationTime,
      lastLoginAt: result.user.metadata.lastSignInTime,
    };

    await updateDoc(docRef, data);
    return result;
  } else {
    let data = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      createdAt: result.user.metadata.creationTime,
      lastLoginAt: result.user.metadata.lastSignInTime,
      enrolledCourses: ['course'],
      updatedAt: 'undefined',
      updatedBy: 'undefined'
    };
    await setDoc(docRef, data);
    return result;
  }
};

export const loginWithProviderUsingRedirect = async (
  auth,
  provider
) =>{
  const result = await signInWithRedirect(auth, provider);

  

  const docRef = doc(db, 'users', result.user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      createdAt: result.user.metadata.creationTime,
      lastLoginAt: result.user.metadata.lastSignInTime,
    };

    await updateDoc(docRef, data);
    return result;
  } else {
    let data = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      createdAt: result.user.metadata.creationTime,
      lastLoginAt: result.user.metadata.lastSignInTime,
      enrolledCourses: ['course'],
      updatedAt: 'undefined',
      updatedBy: 'undefined'
    };
    await setDoc(docRef, data);
    return result;
  }
};