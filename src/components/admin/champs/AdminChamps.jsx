'use client';
import { useAuth } from "@/app/auth/AuthContext";
import { AdminChampsModal, AdminInstructorsModal, Modal } from "@/components/shared/Modal";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AdminChamps() {
  const [champsData, setChampsData] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useAuth();

  const checkAdmin = async () => {
    const response = await fetch("/api/user", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.user.role === 'admin');
    } else {
      console.error('Error al obtener los datos del usuario:', response.statusText);
    }
  }

  

  const fetchChamps = async () => {
    const response = await fetch("/api/champs", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setChampsData(data.champs);
    } else {
      console.error('Error al obtener los instructores:', response.statusText);
    }
  }

  useEffect(() => {
    fetchChamps();
    checkAdmin();
  }
  , []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex items-center justify-center bg-white">
        <div className="container px-4 md:px-6 text white">
          <h2 className="text-xl font-bold tracking-tighter sm:text-5xl  mb-12 text-black">Campeones</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
            {champsData?.map((champ, index) => (
              <div key={index} className="relative flex flex-col items-start justify-end space-y-2 border-gray-800 p-4 bg-gray-400 h-[600px] rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer">
                <Image src={champ.image_url} alt={`champ ${index + 1}`} className="h-full w-full mb-2 object-cover rounded-lg z-0 mix-blend-multiply" fill />
                <h2 className="text-xl font-bold z-10 text-white">{champ.first_name + " " + champ.last_name}</h2>
                <p className="text-sm text-white  z-10">{champ.description}</p>
                {isAdmin ? (
                  <AdminChampsModal isEditForm={true} champ={champ} />
                ) : null}
              </div>
            ))}
            {isAdmin && (
              <AdminChampsModal />
            )}
          </div>
        </div>
      </section>  
    </>
  );
}