'use client';
import { useAuth } from "@/app/auth/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AdminMetadata() {
  const [metadata, setMetadata] = useState([]);

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
      docId: metadata.id,
      title: formData.get('title'),
      description: formData.get('description'),
      siteName: formData.get('siteName'),
      imageUrl: formData.get('imageUrl'),
    };

    const token = user.idToken;

    try {
      const response = await fetch('/api/metadata/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar el metadata.');
      }

      alert('Metadata actualizado exitosamente.');
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el metadata:', error);
      alert(error.message);
    }
  }

  const fetchLanding = async () => {
    const response = await fetch("/api/metadata", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.homeMetadata);
      setMetadata(data.homeMetadata);
    } else {
      console.error('Error al obtener los instfructores:', response.statusText);
    }
  }

  useEffect(() => {
    fetchLanding();
    checkAdmin();
  }, []);

  return (
    <>
      <section className="w-full flex items-center justify-center bg-black">
        <div className="container px-4 md:px-6 text white">
          <h2 className="text-2xl font-bold mb-12 text-white">Administra la Metadata</h2>
          <p className="text-white pb-12">Aquí podrás gestionar la metadata de la página principal.</p>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
            {rendermetadata(metadata, handleEdit)}
          </div>
        </div>
      </section>
    </>
  );
}

function rendermetadata(metadata, handleEdit) {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md">
      <form className="grid grid-cols-1 gap-4" onSubmit={handleEdit}>
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Metadata de la {metadata.id === 'home' && 'página principal'}</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título Principal
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={metadata.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese el título principal"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Principal
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={metadata.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese la descripción principal"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Sitio
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              defaultValue={metadata.siteName}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              placeholder="Ingrese el nombre del sitio"
            />
          </div>

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