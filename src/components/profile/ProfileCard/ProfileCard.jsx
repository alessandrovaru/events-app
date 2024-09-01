'use client'
import { useAuth } from "@/app/auth/AuthContext";
import Image from "next/image";

export const ProfileCard = async () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-black">
        <h1 className="text-2xl font-bold mb-4 text-center">Perfil</h1>
        <p className="text-lg text-center mb-4">¡Bienvenido, {user.displayName}!</p>
        <div className="flex justify-center">
          <Image 
            src={user.photoURL} 
            alt={user.displayName} 
            width={40} 
            height={40} 
            className="rounded-full border-2 border-gray-300" 
          />
        </div>
      </div>
    </div>
  );
}