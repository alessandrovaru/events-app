'use client'
import { useAuth } from '@/app/auth/AuthContext';
// No necesitas importar 'addData' ya que manejarás la solicitud vía API
import { Edit, PenTool, PlusCircle, TowerControl } from 'lucide-react';
import { useState } from 'react';

export const AdminEventsModal = ({ isEditForm, events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      country: formData.get('country'),
      city: formData.get('city'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, token })
      });

      if (response.ok) {
        const result = await response.json();
        handleClose();
        window.location.reload();
      } else {
        console.error('Error al crear el event:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el event:', error);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const data = {
      docId: events.id,
      name: formData.get('name'),
      country: formData.get('country'),
      city: formData.get('city'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/events/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      },
    );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar el event.');
      }

      alert('event actualizado exitosamente.');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el event:', error);
      alert(error.message);
    }
  }

  const handleDelete = async () => {
    const token = user.idToken;

    try {
      const response = await fetch('/api/events/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docId: events.id, token }),
      })
     
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al eliminar el curso.');
      }

      alert('Curso eliminado exitosamente.');
      handleClose();
      window.location.reload();
    } catch (error) {

      console.error('Error al eliminar el curso:', error);
      alert(error.message);
    }
  }



      

  if(isEditForm) {
    return (
      <>
        <div className="relative course-card p-6 bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <button onClick={handleOpen} className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
            <Edit />
          </button>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 !mt-0">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Editar instructor</h3>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                &times;
              </button>
              <div className="mt-2">
              <form className="space-y-6" onSubmit={handleEdit}>
              <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                          Nombre
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={events?.name}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                          Country
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="country"
                            id="country"
                            autoComplete="country"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={events?.country}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="city"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={events?.city}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                          Descripción
                        </label>
                        <div className="mt-1">
                          <textarea
                            name="description"
                            id="description"
                            autoComplete="description"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={events?.description}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2">
                          URL de la imagen
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="image_url"
                            id="image_url"
                            autoComplete="image_url"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={events?.image_url}
                          />
                        </div>
                      </div>
                      <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Guardar
                      </button>
                      <button
                      className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={handleDelete}
                    >
                      Borrar
                    </button>
                    </form>

                    
              </div>
            </div>
          </div>
        </div>
        ) : null}
      </>
    );
  }

  
  return (
    <>
      <div className="relative course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <button onClick={handleOpen} className="absolute bg-gray-900 h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
          <PlusCircle />
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add a new event</h3>
            <div className="mt-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Event Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                        Country
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="country"
                          id="country"
                          autoComplete="country"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="city"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="description"
                          id="description"
                          autoComplete="description"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2">
                       URL de la imagen
                      </label>
                      <span className="text-xs text-gray-500">* La imagen la puedes subir a <a className="text-blue-500" href="www.google.com" target="_blank" rel="noreferrer">firebase</a> y copiar el enlace directo.</span>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="image_url"
                          id="image_url"
                          autoComplete="image_url"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder='https://firebasestorage.goog...'
                        />
                      </div>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                      Guardar
                    </button>
                  </form>
            </div>
            <div className="items-center px-4 py-3">
              
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
};

