'use client';
import { useAuth } from "@/app/auth/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AdminHome() {
  const [landingData, setLandingData] = useState([]);

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


  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const data = {
      docId: landingData.id,
      heroTitle: formData.get('heroTitle'),
      heroDescription: formData.get('heroDescription'),
      heroImage: formData.get('heroImage'),
    };

    alert(JSON.stringify(data));

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/home/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      },
    );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar la page.');
      }

      alert('Page actualizada exitosamente.');
      window.location.reload();
    } catch (error) {
      console.error('Error al editar la page:', error);
      alert(error.message);
    }
  }

  const fetchLanding = async () => {
    const response = await fetch("/api/admin/home", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setLandingData(data.home);
    } else {
      console.error('Error al obtener los instructores:', response.statusText);
    }
  }

  useEffect(() => {
    fetchLanding();
    checkAdmin();
  }
  , []);

  return (
    <>
      <section className="w-full flex items-center justify-center bg-black">
        <div className="container px-4 md:px-6 text white">
          <h2 className="text-2xl font-bold mb-12 text-white">Administra el Landing</h2>
          <p className="text-white pb-12">Aquí podrás gestionar el contenido del landing de la plataforma.</p>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
            {renderLandingData(landingData, handleEdit)}
          </div>          
        </div>
      </section>  
    </>
  );
}
function renderLandingData(landingData, handleEdit) {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md">
      
      <form className="grid grid-cols-1 gap-4" onSubmit={handleEdit}>
        <div className="col-span-1">
          {/* Hero Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Sección Principal</h2>
          <div className="mb-4">
            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título Principal
            </label>
            <input
              type="text"
              id="heroTitle"
              name="heroTitle"
              defaultValue={landingData.heroTitle}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese el título principal"
            />
          </div>

          {/* Hero Description */}
          <div className="mb-4">
            <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Principal
            </label>
            <textarea
              id="heroDescription"
              name="heroDescription"
              defaultValue={landingData.heroDescription}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese la descripción principal"
              rows="3"
            ></textarea>
          </div>

          {/* Hero Image */}
          <div className="mb-4">
            <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700 mb-1">
              Imagen Principal
            </label>
            {landingData.heroImage && (
              <div className="w-full h-48 relative mb-2 rounded-md overflow-hidden">
                <Image
                  src={landingData.heroImage}
                  alt="Hero Image"
                  fill
                  objectFit="cover"
                />
              </div>
            )}
            <input
              type="text"
              id="heroImage"
              name="heroImage"
              defaultValue={landingData.heroImage}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese la URL de la imagen principal"
            />
          </div>

          {/* Botón de Envío (Opcional) */}
          
        </div>
        <div  className="col-span-1">
          {/* Hero Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Sección informativa</h2>
        
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}