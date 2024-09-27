'use client'
import { useAuth } from "@/app/auth/AuthContext";
import Logout from "@/app/Logout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const days = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
};

const colors = {
  red: 'bg-red-700',
  blue: 'bg-blue-700',
  green: 'bg-green-700',
  yellow: 'bg-yellow-700',
  purple: 'bg-purple-700',
  pink: 'bg-pink-700',
  orange: 'bg-orange-700',
}

export const ProfileCard = () => {
  const [ userCourse, setUserCourse ] = useState([]);
  const { user } = useAuth();
  

  const fetchUserCourses = async () => {  
    try {
      const response = await fetch('/api/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.idToken}`
        }
      });
      const data = await response.json();
      setUserCourse(data.courses);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchUserCourses();
  }, []);
  
  return (
    <section className="flex items-center justify-center bg-black min-h-screen p-4">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image src={user.photoURL} alt={user.displayName} className="object-cover rounded-full" fill />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{user.displayName}</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <hr className="my-4 w-full border-gray-300" />
        <div className="flex flex-col space-y-2 w-full">
          <Link href='dashboard' className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-900 transition mb-3 text-center">Dashboard</Link>
        </div>
        <Logout noProfile={true}/>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>¿Necesitas ayuda?</p>
          <p>
            <a href="#" className="text-blue-500 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </section>
  );
};