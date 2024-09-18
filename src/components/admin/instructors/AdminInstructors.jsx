'use client';
import { useAuth } from "@/app/auth/AuthContext";
import { AdminInstructorsModal, Modal } from "@/components/shared/Modal";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AdminInstructors() {
  const [instructorsData, setInstructorsData] = useState([]);

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

  

  const fetchInstructors = async () => {
    const response = await fetch("/api/instructors", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setInstructorsData(data.instructors);
    } else {
      console.error('Error al obtener los instructores:', response.statusText);
    }
  }

  useEffect(() => {
    fetchInstructors();
    checkAdmin();
  }
  , []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-black">
        <div className="container px-4 md:px-6 text white">
          <h2 className="text-xl font-bold tracking-tighter sm:text-5xl  mb-12 text-white">Instructores</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
            {instructorsData?.map((instructor, index) => (
              <div key={index} className="relative flex flex-col items-start justify-end space-y-2 border-gray-800 p-4 bg-gray-400 h-[600px] rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer z-7">
                <Image src={instructor.image_url} alt={`Instructor ${index + 1}`} className="h-full w-full mb-2 object-cover rounded-lg z-0 mix-blend-multiply" fill />
                <h2 className="text-xl font-bold text-white z-10">{instructor.first_name + " " + instructor.last_name}</h2>
                <p className="text-sm text-white z-10">{instructor.description}</p>
                {isAdmin ? (
                  <AdminInstructorsModal isEditForm={true} instructors={instructor} />
                ) : null}
              </div>
            ))}
            {isAdmin && (
              <AdminInstructorsModal />
            )}
          </div>
        </div>
      </section>  
    </>
  );
}