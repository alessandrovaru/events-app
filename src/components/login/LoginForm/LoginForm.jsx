'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import {useLoadingCallback} from 'react-loading-hook';
import { getFirebaseAuth } from "@/app/auth/firebase";
import { getGoogleProvider, loginWithProvider, loginWithProviderUsingRedirect } from "@/app/login/firebase";
import { loginWithCredential } from "@/api";
import { useRedirectParam } from "@/app/shared/useRedirectParam";
import { useRedirectAfterLogin } from "@/app/shared/useRedirectAfterLogin";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();



  async function handleLogin(credential) {
    await loginWithCredential(credential);
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

  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {

      const auth = getFirebaseAuth();
      await handleLogin(await loginWithProvider(auth, getGoogleProvider(auth)));
    });
  return(
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
      <div className="p-6 ">
        {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
          Inicio de sesión
        </h1> */}
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
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
          onClick={handleLoginWithGoogle} 
          className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
        >
            Sign in with Google
          </button>
      </div>
    </div>
  )
}