
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

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
  const result = await signInWithPopup(
    auth,
    provider,
    browserPopupRedirectResolver
  );

  return result;
};

export const loginWithProviderUsingRedirect = async (
  auth,
  provider
) =>{
  await signInWithRedirect(auth, provider);
};