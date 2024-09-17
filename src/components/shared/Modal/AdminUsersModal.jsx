'use client'
import { useAuth } from '@/app/auth/AuthContext';
// No necesitas importar 'addData' ya que manejarás la solicitud vía API
import { Edit, PenTool, PlusCircle, TowerControl } from 'lucide-react';
import { useState } from 'react';

export const AdminUsersModal = ({ isEditForm, userData, courses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }


  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const data = {
      docId: userData.id,
      enrolledCourses: [ ...formData.getAll('enrolledCourses') ],
    };

    console.log('Data:', data);

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/users/editUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      },
    );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar el Usuario.');
      }

      alert('Usuario actualizado exitosamente.');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el Champ:', error);
      alert(error.message);
    }
  }
      

  if(isEditForm) {
    return (
      <>
        <div className="relative bg-red-200 text-red-800 px-2 py-1 rounded-full mr-2 w-auto inline-block mt-2 mb-2">
          <button onClick={handleOpen} className="h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
            +
          </button>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Champ</h3>
              <div className="mt-2">
              <form className="space-y-6" onSubmit={handleEdit}>
                <div>
                  <label htmlFor="enrolledCourses" className="block text-gray-700 text-sm font-bold mb-2">
                    Cursos inscritos
                  </label>
                  <div className="mt-1 text-black">
                    
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`course-${course.id}`}
                        name="enrolledCourses"
                        value={course.id}
                        defaultChecked={userData.enrolledCourses?.includes(course.id)}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <label htmlFor={`course-${course.id}`} className="ml-2 block text-sm text-gray-900">
                        {course.name}
                      </label>
                    </div>
                  ))}
                  </div>
                </div>
                      <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Guardar
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

};

