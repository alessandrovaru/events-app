'use client'
import { useAuth } from '@/app/auth/AuthContext';
// No necesitas importar 'addData' ya que manejarás la solicitud vía API
import { Edit, PenTool, PlusCircle, TowerControl } from 'lucide-react';
import { useState } from 'react';

export const Modal = ({ isEditForm, course }) => {
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
    const days = formData.getAll('days').map(Number); // Obtener todos los valores seleccionados y convertirlos a números

    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      discipline: formData.get('discipline'),
      location: formData.get('location'),
      days, // Ahora es un array de números
      time: formData.get('time'),
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/addCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear el curso.');
      }

      alert('Curso creado exitosamente.');
      handleClose();
    } catch (error) {
      console.error('Error al agregar el curso:', error);
      alert(error.message);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const days = formData.getAll('days').map(Number); // Obtener todos los valores seleccionados y convertirlos a números

    const data = {
      docId: course.id,
      name: formData.get('name'),
      description: formData.get('description'),
      discipline: formData.get('discipline'),
      location: formData.get('location'),
      days, // Ahora es un array de números
      time: formData.get('time'),
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/editCourse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      },
    );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar el curso.');
      }

      alert('Curso actualizado exitosamente.');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el curso:', error);
      alert(error.message);
    }
  }


  const handleDelete = async () => {
    const token = user.idToken;

    try {
      const response = await fetch('/api/deleteCourse', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docId: course.id, token }),
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
        <div className="relative course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <button onClick={handleOpen} className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
            <Edit />
          </button>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 ">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Course</h3>
                <div className="mt-2">
                  <form className="space-y-6" onSubmit={handleEdit}>
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={course.name}
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
                          defaultValue={course.description}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="discipline" className="block text-gray-700 text-sm font-bold mb-2">
                        Discipline
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="discipline"
                          id="discipline"
                          autoComplete="discipline"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={course.discipline}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Location
                      </label>  
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          autoComplete="location"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={course.location}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Days
                      </label>
                      <div className="flex flex-wrap">
                        {[
                          { label: 'Lunes', value: 1 },
                          { label: 'Martes', value: 2 },
                          { label: 'Miércoles', value: 3 },
                          { label: 'Jueves', value: 4 },
                          { label: 'Viernes', value: 5 },
                          { label: 'Sábado', value: 6 },
                          { label: 'Domingo', value: 7 },
                        ].map(day => (
                          <label key={day.value} className="mr-4 mb-2 flex items-center text-black">
                            <input
                              type="checkbox"
                              name="days"
                              value={day.value}
                              defaultChecked={isEditForm && course.days.includes(day.value)}
                              className="mr-2"
                            />
                            {day.label}cxc
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                        Time
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="time"
                          id="time"
                          autoComplete="time"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue={course.time}
                        />
                      </div>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Save
                    </button>
                  </form>
                </div>
                <div className="items-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mt-2">
                    Delete
                  </button>
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
        <button onClick={handleOpen} className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
          <PlusCircle />
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Course</h3>
            <div className="mt-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
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
                      <label htmlFor="discipline" className="block text-gray-700 text-sm font-bold mb-2">
                        Discipline
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="discipline"
                          id="discipline"
                          autoComplete="discipline"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Location
                      </label>  
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          autoComplete="location"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Days
                      </label>
                      <div className="flex flex-wrap">
                        {[
                          { label: 'Lunes', value: 1 },
                          { label: 'Martes', value: 2 },
                          { label: 'Miércoles', value: 3 },
                          { label: 'Jueves', value: 4 },
                          { label: 'Viernes', value: 5 },
                          { label: 'Sábado', value: 6 },
                          { label: 'Domingo', value: 7 },
                        ].map(day => (
                          <label key={day.value} className="mr-4 mb-2 flex items-center text-black">
                            <input
                              type="checkbox"
                              name="days"
                              value={day.value}
                              defaultChecked={isEditForm && course.days.includes(day.value)}
                              className="mr-2 "
                            />
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                        Time
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="time"
                          id="time"
                          autoComplete="time"
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Save
                    </button>
                  </form>
            </div>
            <div className="items-center px-4 py-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
};

