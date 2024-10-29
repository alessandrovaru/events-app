'use client';
import { useAuth } from "@/app/auth/AuthContext";
import { AdminInstructorsModal, Modal } from "@/components/shared/Modal";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AdminInstructors() {
  const [instructorsData, setInstructorsData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
  }, []);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  }

  return (
    <>
      <section className="w-full py-16 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container text-white">
          {/* <button 
            onClick={toggleVisibility}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6 ms-6"
          >
            {isVisible ? 'Ocultar Instructores' : 'Editar Instructores'}
          </button> */}

          {isVisible && (
            <div className="px-6 py-6">
              <h2 className="text-3xl font-extrabold mb-12 text-left text-white">
                Instructores
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {instructorsData?.map((instructor, index) => (
                  <div 
                    key={index} 
                    className="relative group overflow-hidden bg-gradient-to-t from-gray-800 to-gray-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300  h-[300px] "
                  >
                    <div className="absolute inset-0 w-full h-full z-0">
                      <Image 
                        src={instructor.image_url} 
                        alt={`Instructor ${index + 1}`} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 transform group-hover:scale-110 opacity-50"
                        fill
                      />
                    </div>
                    <div className="z-10 w-full text-left bg-opacity-70 bg-black p-4 rounded-lg h-full flex flex-col justify-end">
                      <h2 className="relative text-xl font-semibold text-white mb-2">
                        {instructor.first_name + " " + instructor.last_name}
                      </h2>
                      <p className="relative text-sm text-gray-300">
                        {instructor.description}
                      </p>
                      {isAdmin && (
                        <AdminInstructorsModal isEditForm={true} instructors={instructor} />
                      )}
                    </div>
                  </div>
                ))}
                {isAdmin && (
                  <AdminInstructorsModal />
                )}
              </div>
            </div>
          )}
        </div>
      </section>  
    </>
  );
}
