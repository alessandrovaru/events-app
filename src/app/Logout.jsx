"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "./auth/AuthContext.jsx";
import Link from "next/link";


export default function Logout({ email }) {
  const router = useRouter();

  const {user} = useAuth();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  }

  return (
    <>
      <Link
        href="/profile"
        className="text-white bg-red-900 bg-red-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-950 dark:focus:ring-primary-800"
      >
        {user.displayName}
      </Link>
      <button
        onClick={handleLogout}
        className="text-white bg-red-900 bg-red-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-950 dark:focus:ring-primary-800"
      >
        Logout
      </button>
    </>
  );
}