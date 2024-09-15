"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

import { useAuth } from "./auth/AuthContext.jsx";
import Link from "next/link";
import { getFirebaseApp } from "./auth/firebase";



export default function Logout({ email, noProfile }) {
  const router = useRouter();

  const {user} = useAuth();

  async function handleLogout() {
    await signOut(getAuth(getFirebaseApp()));

    await fetch("/api/logout");

    router.push("/login");
  }

  return (
    <>
      {!noProfile && (
        <Link
          href="/profile"
          className="text-white bg-red-900 bg-red-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-950 dark:focus:ring-primary-800 mr-4"
        >
          {user.displayName}
        </Link>
      )}
      <button
        onClick={handleLogout}
        className={`bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition ${!noProfile ? 'mr-4' : ''}`}
      >
        Cerrar sesión
      </button>
    </>
  );
}