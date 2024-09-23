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
      color: formData.get('color'),
      image_url: formData.get('image_url'),
      isReservable: formData.get('isReservable'),
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/courses/addCourse', {
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
      window.location.reload();
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
      color: formData.get('color'),
      image_url: formData.get('image_url'),
      isReservable: formData.get('isReservable')
    };

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/courses/editCourse', {
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
      const response = await fetch('/api/courses/deleteCourse', {
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
        <div className="relative course-card p-6 bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-10">
          <button onClick={handleOpen} className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
            <Edit />
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white sm:p-6 lg:p-8">
              <div className="mt-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Editar curso</h3>
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                  onClick={handleClose}
                >
                  &times;
                </button>
                <div className="mt-4">
                  <form className="grid grid-cols-1 md:grid-cols-4 gap-6" onSubmit={handleEdit}>
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre
                      </label>
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
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label htmlFor="discipline" className="block text-gray-700 text-sm font-bold mb-2">
                        Disciplina
                      </label>
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
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Locación
                      </label>  
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
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                        Horario
                      </label>
                      <input
                        type="text"
                        name="time"
                        id="time"
                        autoComplete="time"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={course.time}
                      />
                      <span className="text-xs text-gray-500">*Ejemplo: 08:00 - 10:00 PM</span>
                    </div>
                    <div className="col-span-4">
                      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        autoComplete="description"
                        required
                        className="shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={course.description}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                        URL de la imagen
                      </label>
                      <span className="text-xs text-gray-500">* La imagen la puedes subir a <a className="text-blue-500" href={process.env.NEXT_PUBLIC_FIREBASE_INSTRUCTORS_IMAGES_BUCKET} target="_blank" rel="noreferrer">firebase</a> y copiar el enlace directo.</span>
                      <input
                        type="text"
                        name="image_url"
                        id="image_url"
                        autoComplete="image_url"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={course.image_url}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Días
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
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Color
                      </label>
                      <div className="flex flex-wrap">
                        {[
                          { label: 'Rojo', value: 'red' },
                          { label: 'Azul', value: 'blue' },
                          { label: 'Verde', value: 'green' },
                          { label: 'Amarillo', value: 'yellow' },
                          { label: 'Morado', value: 'purple' },
                          { label: 'Rosa', value: 'pink' },
                          { label: 'Naranja', value: 'orange' },
                        ].map(color => (
                          <label key={color.value} className="mr-4 mb-2 flex items-center text-black">
                            <input
                              type="radio"
                              name="color"
                              value={color.value}
                              defaultChecked={isEditForm && course.color === color.value}
                              className="mr-2"
                            />
                            {color.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 lg:col-span-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Reservable
                      </label>
                      <div className="flex flex-wrap">
                        <label className="mr-4 mb-2 flex items-center text-black">
                          <input
                            type="radio"
                            name="isReservable"
                            value={true}
                            defaultChecked={isEditForm && course.isReservable}
                            className="mr-2"
                          />
                          Sí, es reservable
                        </label>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt-4">
                  <button onClick={handleDelete} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  

  return (
    <>
      <div className="relative course-card p-6 bg-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <button onClick={handleOpen} className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
          <PlusCircle />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
          <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white sm:p-6 lg:p-8">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Course</h3>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                &times;
              </button>
              <div className="mt-4">
                <form className="grid grid-cols-1 md:grid-cols-4 gap-6" onSubmit={handleSubmit}>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label htmlFor="discipline" className="block text-gray-700 text-sm font-bold mb-2">
                      Discipline
                    </label>
                    <input
                      type="text"
                      name="discipline"
                      id="discipline"
                      autoComplete="discipline"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                      Location
                    </label>  
                    <input
                      type="text"
                      name="location"
                      id="location"
                      autoComplete="location"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      id="time"
                      autoComplete="time"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      autoComplete="description"
                      required
                      className="shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image_url"
                      id="image_url"
                      autoComplete="image_url"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
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
                            className="mr-2"
                          />
                          {day.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap">
                      {[
                        { label: 'Rojo', value: 'red' },
                        { label: 'Azul', value: 'blue' },
                        { label: 'Verde', value: 'green' },
                        { label: 'Amarillo', value: 'yellow' },
                        { label: 'Morado', value: 'purple' },
                        { label: 'Rosa', value: 'pink' },
                        { label: 'Naranja', value: 'orange' },
                      ].map(color => (
                        <label key={color.value} className="mr-4 mb-2 flex items-center text-black">
                          <input
                            type="radio"
                            name="color"
                            value={color.value}
                            className="mr-2"
                          />
                          {color.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 lg:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Reservable
                    </label>
                    <div className="flex flex-wrap">
                      <label className="mr-4 mb-2 flex items-center text-black">
                        <input
                          type="radio"
                          name="isReservable"
                          value={true}
                          className="mr-2"
                        />
                        Sí, es reservable
                      </label>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}