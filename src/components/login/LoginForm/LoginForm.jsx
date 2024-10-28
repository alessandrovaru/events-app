'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {useLoadingCallback} from 'react-loading-hook';
import { getFirebaseApp, getFirebaseAuth } from "@/app/auth/firebase";
import { getGoogleProvider, loginWithProvider, loginWithProviderUsingRedirect } from "@/app/login/firebase";
import { loginWithCredential } from "@/api";
import { useRedirectParam } from "@/app/shared/useRedirectParam";
import { useRedirectAfterLogin } from "@/app/shared/useRedirectAfterLogin";
import Image from "next/image";

import logo from "/public/images/logo.jpg";
import Link from "next/link";
import { getRedirectResult } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasLogged, setHasLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();



  async function handleLogin(credential) {
    setIsLoading(true);
    await loginWithCredential(credential);
    setIsLoading(false);
    redirectAfterLogin();
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setError("");

  //   try {
  //     const credential = await signInWithEmailAndPassword(
  //       getAuth(app),
  //       email,
  //       password
  //     );
  //     const idToken = await credential.user.getIdToken();

  //     await fetch("/api/login", {
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     });

  //     router.push("/dashboard");
  //   } catch (e) {
  //     setError((e).message);
  //   }
  // }

  
  async function handleLoginWithRedirect() {
    setIsLoading(true);
    setHasLogged(false);
    const auth = getFirebaseAuth();
    const credential = await getRedirectResult(auth);

    if (credential?.user) {
      await processUser(credential.user);
      await handleLogin(credential);
      setHasLogged(true);
      
    }
    setIsLoading(false);
  }


  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      await handleLogin(await loginWithProvider(auth, getGoogleProvider(auth)));
      setHasLogged(true);
    });

    const [
      handleLoginWithGoogleUsingRedirect,
      isGoogleUsingRedirectLoading,
      googleUsingRedirectError
    ] = useLoadingCallback(async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      await loginWithProviderUsingRedirect(auth, getGoogleProvider(auth));
      // No necesitas establecer hasLogged aquí, ya que la página se recargará
    });
  
    useEffect(() => {
      handleLoginWithRedirect();
    }, []);
  
    // Nueva función para manejar Firestore
    const processUser = async (user) => {
      const db = getFirestore(getFirebaseApp());
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      const data = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime,
      };
  
      if (docSnap.exists()) {
        await updateDoc(docRef, { ...data, lastLoginAt: new Date().toISOString() });
      } else {
        await setDoc(docRef, {
          ...data
        });
      }
    };
  
  return(
    <div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800">
      <div className="p-6">
        
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white">
            
          </div>
        </div>
      )}
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl text-white mb-3">
          Total Elite Training
        </h1>
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
          Inicio de sesión
        </h2>
        <form
          className="space-y-4 md:space-y-6"
          action="#"
        >
          {/* <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {/* <button
            type="submit"
            className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
          >
            Iniciar sesión
          </button> */}
          {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-600 hover:underline dark:text-gray-500"
            >
              Regístrate aquí
            </Link>
          </p> */}
        </form>
        <button 
          disabled={isGoogleLoading}
          onClick={handleLoginWithGoogle} 
          className="w-full text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mt-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="ms-3 text-black">
            Inicia sesión con Google
          </span>
        </button>
        <button 
          disabled={isGoogleUsingRedirectLoading}
          onClick={handleLoginWithGoogleUsingRedirect} 
          className="w-full text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mt-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="ms-3 text-black">
            Inicia sesión con Google (para Iphone)
          </span>
        </button>
          <Link 
          href={"/"}
          className="w-full text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mt-3"
        >
          
            <span className="text-black">
              Home
            </span>
          </Link>
      </div>
    </div>
  )
}